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
  const liveClass = await connectToMongo(process.env.LIVE_CLASS);
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
    const studentClassModelNew = liveClass.db().collection("studentclasses");
    const eClassModelNew = liveClass.db().collection("eclasses");
    const enrollmentModel = Learn.db().collection("enrollments");
    const assignmentModel = Learn.db().collection("assignments");
    const eClassMessagesModel = liveClass.db().collection("eclassmessages");
    const feedBackModelOld = onlineTutoringDBClient
      .db()
      .collection("feedbacks");
    const reportsModelNew = liveClass.db().collection("reports");
    const feedbacksModel = liveClass.db().collection("feedbacks");
    const resourceModel = liveClass.db().collection("resources");
    const reportsModelOld = onlineTutoringDBClient.db().collection("reports");
    const eclassDocsModelOld = onlineTutoringDBClient
      .db()
      .collection("eclassdocs");

    const teachersData = await teacherModel.find().toArray();
    const courseData = await coursesModel.find().limit(1).toArray();

    const batchIds = courseData.flatMap((course) => course.batches);
    const chapterTestDataOld = courseData.flatMap((course) =>
      (course.chapterMeta || [])?.map((chapterTest) =>
        convertToChaptertestSchema(chapterTest)
      )
    );
    const batchData = await batchModel
      .find({ _id: { $in: batchIds } })
      .toArray();
    const coursePayload = courseData?.map((course) =>
      convertCourseToGroup(course)
    );
    const batchPayload = batchData?.map((batch) =>
      convertBatchToSubgroup(batch)
    );
    const enrollmentData = await studentEnrollmentModelOld
      .find({ courses: { $in: courseData.map((course) => course._id) } })
      .toArray();

    const eClasses = await eClassModelOld
      .find({ batch: { $in: batchIds } })
      .toArray();
    const feedBacksData = await feedBackModelOld
      .find({ class: { $in: eClasses.map((eClass) => eClass._id) } })
      .toArray();
    const reportsData = await reportsModelOld
      .find({ class: { $in: eClasses.map((eClass) => eClass._id) } })
      .toArray();

    const eclassDocsData = await eclassDocsModelOld
      .find({ class: { $in: eClasses.map((eClass) => eClass._id) } })
      .toArray();
    const feedBacksPayload = feedbacksData(feedBacksData);
    const reportsPayload = reportsConvertion(reportsData);
    const resourcePayload = resourceData(eclassDocsData);

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
      .find({
        class: { $in: convertedEclassData.map((eClass) => eClass._id) },
        attendedDurationInSeconds: { $ne: 0 },
      })
      .toArray();

    const convertedStudentClassData = studentClassHelper(studentClassesDataOld);
    console.log("coursePayload data started........");
    const groupDataMigration = await groupModel.insertMany(coursePayload);
    console.log("coursePayload data completed........");
    console.log("coursePayload data started........");
    const subGroupDataMigration = await subGroupModel.insertMany(batchPayload);
    console.log("coursePayload data completed........");

    console.log("resources data started........");
    const resourcesData = await resourceModel.insertMany(resourcePayload);
    console.log("resources data completed........");

    console.log("reports data started........");
    if (reportsPayload?.length) {
      const reportedData = await reportsModelNew.insertMany(reportsPayload);
    }
    console.log("reports data completed........");

    console.log("Enrollment data started........");
    const enrollmentDataMigration = await enrollmentModel.insertMany(
      enrollmentPayload
    );
    console.log("Enrollment data completed........");
    console.log("feedbacks data started........");
    const feedbacksDataMigration = await feedbacksModel.insertMany(
      feedBacksPayload
    );
    console.log("feedbacks data completed........");

    console.log("Assignment data started........");
    const assignmentData = await assignmentModel.insertMany(assignmentPayload);
    console.log("Assignment data completed........");

    console.log("EClass messages data.....");
    const eClassMessages = await eClassMessagesModel.insertMany(
      eClassMessagesPayload
    );
    console.log("EClass messages data completed........");

    console.log("Converting classes data........");
    const eclassesDataConversion = await eClassModelNew.insertMany(
      convertedEclassData
    );
    console.log("Converting classes data completed........");

    console.log("Converting studentClasses data........");
    const studentClassDataConversion = await studentClassModelNew.insertMany(
      convertedStudentClassData
    );
    console.log("Converting studentClasses data completed........");

    await closeMongoConnection(onlineTutoringDBClient);
    await closeMongoConnection(Learn);
    await closeMongoConnection(liveClass);
  } catch (error) {
    console.error("Error in the main block:", error);
    await closeMongoConnection(onlineTutoringDBClient);
    await closeMongoConnection(Learn);
    await closeMongoConnection(liveClass);
    return true;
  }
})();
