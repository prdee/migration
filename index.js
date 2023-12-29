const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const { convertCourseToGroup } = require("./handlers/CourseToGroup");
const { convertBatchToSubgroup } = require("./handlers/batchesToSubGroup");
const { convertEClassToNewSchema } = require("./handlers/eclasses");
const { studentClassHelper } = require("./handlers/studentclasses");
const { convertMessages } = require("./handlers/eClassMessages");
const { convertToAssignmentSchema } = require("./handlers/asssignments");
const { convertEnrollmentToNewSchema } = require("./handlers/enrollment");
const { convertToChaptertestSchema } = require("./handlers/chapter");
const { feedbacksData } = require("./handlers/feedbacks");
const { reportsConvertion } = require("./handlers/reports");
const { resourceData } = require("./handlers/eclassdocs");
const { faqmigration } = require("./handlers/faqs");

dotenv.config();

const connectToMongo = async (uri) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log(`Connected to MongoDB at ${uri}`);
    return client;
  } catch (error) {
    console.error(`Error connecting to MongoDB at ${uri}:`, error);
    throw error;
  }
};

const closeMongoConnection = async (dbClient) => {
  try {
    await dbClient.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
};

(async () => {
  const onlineTutoringDBClient = await connectToMongo(
    process.env.online_tutoring
  );
  const Learn = await connectToMongo(process.env.LEARN);
  const liveclass = await connectToMongo(process.env.LIVE_CLASS);
  console.time("start")
  try {
    const coursesModel = onlineTutoringDBClient.db().collection("courses");
    const batchModel = onlineTutoringDBClient.db().collection("batches");
    const subGroupModel = Learn.db().collection("subgroups");
    const groupModel = Learn.db().collection("groups");
    const eClassModelOld = onlineTutoringDBClient.db().collection("eclasses");
    const teacherModel = onlineTutoringDBClient.db().collection("teachers");
    const studentEnrollmentModelOld = onlineTutoringDBClient
      .db()
      .collection("studentenrollments");
    const studentClassModelOld = onlineTutoringDBClient
      .db()
      .collection("studentclasses");
    const studentClassModelNew = liveclass.db().collection("studentclasses");
    const eClassModelNew = liveclass.db().collection("eclasses");
    const enrollmentModel = Learn.db().collection("enrollments");
    const assignmentModel = Learn.db().collection("assignments");
    const faqModelNew = Learn.db().collection("faqs");
    const eClassMessagesModel = liveclass.db().collection("eclassmessages");
    const feedBackModelOld = onlineTutoringDBClient
      .db()
      .collection("feedbacks");
    const reportsModelNew = liveclass.db().collection("reports");
    const feedbacksModel = liveclass.db().collection("feedbacks");
    const resourceModel = liveclass.db().collection("resources");
    const reportsModelOld = onlineTutoringDBClient.db().collection("reports");
    const faqModelOld = onlineTutoringDBClient.db().collection("faqs");
    const eclassDocsModelOld = onlineTutoringDBClient
      .db()
      .collection("eclassdocs");

    const teachersData = await teacherModel.find().toArray();
    const courseData = await coursesModel
      .find()
      // .limit(10)
      .toArray();

    const batchIds = courseData.flatMap((course) => course.batches);
    const chapterTestDataOld = courseData.flatMap((course) =>
      (course.chapterMeta || [])?.map((chapterTest) =>
        convertToChaptertestSchema(chapterTest)
      )
    );
    const batchData = await batchModel
      .find()
      .toArray();
    const coursePayload = courseData?.map((course) =>
      convertCourseToGroup(course)
    );
    const batchPayload = batchData?.map((batch) =>
      convertBatchToSubgroup(batch)
    );
    const enrollmentData = await studentEnrollmentModelOld
      .find()
      .toArray();

    const eClasses = await eClassModelOld.find().toArray();
    const feedBacksData = await feedBackModelOld
      .find()
      .toArray();
    const reportsData = await reportsModelOld
      .find()
      .toArray();

    const eclassDocsData = await eclassDocsModelOld
      .find()
      .toArray();
    const faqs = await faqModelOld.find().toArray();
    const feedBacksPayload = feedbacksData(feedBacksData);
    const reportsPayload = reportsConvertion(reportsData);
    const resourcePayload = resourceData(eclassDocsData);
    const faqsPayload = faqmigration(faqs);

    const assignmentPayload = [];
    for (let eClass of eClasses) {
      if (eClass.classAssignments && eClass.classAssignments.length) {
        for (let eClassAssignment of eClass.classAssignments) {
          const convertedAssignmentData = convertToAssignmentSchema({
            ruleId: eClassAssignment.ruleID,
            subjectMeta: eClass.subjectMeta,
            batches: eClassAssignment.batches || eClass.batch,
            courses: eClassAssignment.courses || eClass.course,
            examType:
              eClassAssignment.examType ||
              eClassAssignment.examType ||
              eClassAssignment.exams?.toString(),
            grade: eClassAssignment.grade || eClass.grade,
            time: eClassAssignment.time || eClass.endTime,
            eClassId: eClass._id,
          });
          assignmentPayload.push(convertedAssignmentData);
        }
      }
    }

    const eClassMessagesPayload = eClasses.map((eClass) =>
      convertMessages(eClass)
    );
    const enrollmentPayload = enrollmentData.map((enrollment) =>
      convertEnrollmentToNewSchema(enrollment)
    );
    const convertedEclassData = eClasses.map((eClass) => {
      let eClassData = convertEClassToNewSchema(eClass);
      let teacherData = teachersData.find(
        (teacher) => teacher?._id?.toString() == eClassData?.teacher
      );
      eClassData.teacher = teacherData?.uml_id;
      return eClassData;
    });

    const studentClassesDataOld = await studentClassModelOld
      .find()
      .toArray();

    const convertedStudentClassData = studentClassHelper(studentClassesDataOld);
    const insertionPromises = [
      groupModel.insertMany(coursePayload),
      subGroupModel.insertMany(batchPayload),
      resourceModel.insertMany(resourcePayload),
      reportsModelNew.insertMany(reportsPayload),
      enrollmentModel.insertMany(enrollmentPayload),
      assignmentModel.insertMany(assignmentPayload),
      eClassMessagesModel.insertMany(eClassMessagesPayload),
      feedbacksModel.insertMany(feedBacksPayload),
      eClassModelNew.insertMany(convertedEclassData),
      studentClassModelNew.insertMany(convertedStudentClassData),
      faqModelNew.insertMany(faqsPayload),
    ];
    console.log("Inserting the data.........");
    await Promise.all(insertionPromises);
    console.log("completed.........");

    await closeMongoConnection(onlineTutoringDBClient);
    await closeMongoConnection(Learn);
    await closeMongoConnection(liveclass);
    console.timeLog("start")
  } catch (error) {
    console.timeLog("start")
    console.error("Error in the main block:", error);
    await closeMongoConnection(onlineTutoringDBClient);
    await closeMongoConnection(Learn);
    await closeMongoConnection(liveclass);
    return true;
  }
})();
