const convertDateToTimestamp = (date) => {
  return Math.floor(new Date(date).getTime() / 1000);
};

const CMSEXAMDATA = [];
const filteredCMSData = [
  {
    examId: 27,
    examTypeId: 1,
    displayName: "Grade 6-TS State Board",
    name: "SC_Grade 6 TS State Board",
  },
  {
    examId: 52,
    examTypeId: 1,
    displayName: "SC_Grade 5 TS STATE",
    name: "SC_Grade 5 TS STATE",
  },
  {
    examId: 32,
    examTypeId: 1,
    displayName: "Grade 6-AP State Board ",
    name: "SC_Grade 6 AP State Board",
  },
  {
    examId: 28,
    examTypeId: 1,
    displayName: "Grade 10-AP State Board",
    name: "SC_Grade 10 AP State Board",
  },
  {
    examId: 46,
    examTypeId: 1,
    displayName: "SC_Grade 1 CBSE",
    name: "SC_Grade 1 CBSE",
  },
  {
    examId: 48,
    examTypeId: 1,
    displayName: "SC_Grade 4 AP STATE",
    name: "SC_Grade 4 AP STATE",
  },
  {
    examId: 30,
    examTypeId: 1,
    displayName: "Grade 8-AP State Board",
    name: "SC_Grade 8 AP State Board",
  },
  {
    examId: 25,
    examTypeId: 1,
    displayName: "Grade 8-TS State Board",
    name: "SC_Grade 8 TS State Board",
  },
  {
    examId: 50,
    examTypeId: 1,
    displayName: "SC_Grade 2 AP STATE",
    name: "SC_Grade 2 AP STATE",
  },
  {
    examId: 45,
    examTypeId: 1,
    displayName: "SC_Grade 2 CBSE",
    name: "SC_Grade 2 CBSE",
  },
  {
    examId: 29,
    examTypeId: 1,
    displayName: "Grade 9-AP State Board",
    name: "SC_Grade 9 AP State Board",
  },
  {
    examId: 47,
    examTypeId: 1,
    displayName: "SC_Grade 5 AP STATE",
    name: "SC_Grade 5 AP STATE",
  },
  {
    examId: 56,
    examTypeId: 1,
    displayName: "SC_Grade 1 TS STATE",
    name: "SC_Grade 1 TS STATE",
  },
  {
    examId: 26,
    examTypeId: 1,
    displayName: "Grade 7-TS State Board",
    name: "SC_Grade 7 TS State Board",
  },
  {
    examId: 61,
    examTypeId: 1,
    displayName: "SC_Grade LKG CBSE",
    name: "SC_Grade LKG CBSE",
  },
  {
    examId: 31,
    examTypeId: 1,
    displayName: "Grade 7-AP State Board",
    name: "SC_Grade 7 AP State Board",
  },
  {
    examId: 53,
    examTypeId: 1,
    displayName: "SC_Grade 4 TS STATE",
    name: "SC_Grade 4 TS STATE",
  },
  {
    examId: 12,
    examTypeId: 1,
    displayName: "CBSE Grade 12",
    name: "CBSE Grade 12",
  },
  {
    examId: 51,
    examTypeId: 1,
    displayName: "SC_Grade 1 AP STATE",
    name: "SC_Grade 1 AP STATE",
  },
  {
    examId: 65,
    examTypeId: 1,
    displayName: "SC_Grade Nursery AP State",
    name: "SC_Grade Nursery AP State",
  },
  {
    examId: 11,
    examTypeId: 1,
    displayName: "CBSE Grade 11",
    name: "CBSE Grade 11",
  },
  {
    examId: 62,
    examTypeId: 1,
    displayName: "SC_Grade Nursery CBSE",
    name: "SC_Grade Nursery CBSE",
  },
  {
    examId: 67,
    examTypeId: 1,
    displayName: "SC_Grade LKG TS State",
    name: "SC_Grade LKG TS State",
  },
  {
    examId: 42,
    examTypeId: 1,
    displayName: "SC_Grade 5 CBSE",
    name: "SC_Grade 5 CBSE",
  },
  {
    examId: 66,
    examTypeId: 1,
    displayName: "SC_Grade UKG TS State",
    name: "SC_Grade UKG TS State",
  },
  {
    examId: 68,
    examTypeId: 1,
    displayName: "SC_Grade Nursery TS State",
    name: "SC_Grade Nursery TS State",
  },
  { examId: 1, examTypeId: 2, displayName: "NEET", name: "NEET" },
  {
    examId: 60,
    examTypeId: 1,
    displayName: "SC_Grade UKG CBSE",
    name: "SC_Grade UKG CBSE",
  },
  {
    examId: 55,
    examTypeId: 1,
    displayName: "SC_Grade 2 TS STATE",
    name: "SC_Grade 2 TS STATE",
  },
  {
    examId: 23,
    examTypeId: 1,
    displayName: "Grade 10-TS State Board",
    name: "SC_Grade 10 TS State Board",
  },
  {
    examId: 44,
    examTypeId: 1,
    displayName: "SC_Grade 3 CBSE",
    name: "SC_Grade 3 CBSE",
  },
  {
    examId: 64,
    examTypeId: 1,
    displayName: "SC_Grade LKG AP State",
    name: "SC_Grade LKG AP State",
  },
  {
    examId: 63,
    examTypeId: 1,
    displayName: "SC_Grade UKG AP State",
    name: "SC_Grade UKG AP State",
  },
  {
    examId: 54,
    examTypeId: 1,
    displayName: "SC_Grade 3 TS STATE",
    name: "SC_Grade 3 TS STATE",
  },
  {
    examId: 24,
    examTypeId: 1,
    displayName: "Grade 9-TS State Board",
    name: "SC_Grade 9 TS State Board",
  },
  {
    examId: 49,
    examTypeId: 1,
    displayName: "SC_Grade 3 AP STATE",
    name: "SC_Grade 3 AP STATE",
  },
  {
    examId: 43,
    examTypeId: 1,
    displayName: "SC_Grade 4 CBSE",
    name: "SC_Grade 4 CBSE",
  },
  { examId: 2, examTypeId: 2, displayName: "JEE Main", name: "JEE Main" },
  {
    examId: 3,
    examTypeId: 2,
    displayName: "JEE Advanced",
    name: "JEE Advanced",
  },
  {
    examId: 6,
    examTypeId: 1,
    displayName: "CBSE Grade 6",
    name: "CBSE Grade 6",
  },
  {
    examId: 7,
    examTypeId: 1,
    displayName: "CBSE Grade 7",
    name: "CBSE Grade 7",
  },
  {
    examId: 8,
    examTypeId: 1,
    displayName: "CBSE Grade 8",
    name: "CBSE Grade 8",
  },
  {
    examId: 9,
    examTypeId: 1,
    displayName: "CBSE Grade 9",
    name: "CBSE Grade 9",
  },
  {
    examId: 10,
    examTypeId: 1,
    displayName: "CBSE Grade 10",
    name: "CBSE Grade 10",
  },
  {
    examId: 18,
    examTypeId: 1,
    displayName: "TS Intermediate Second Year",
    name: "TS Intermediate Second Year",
  },
  {
    examId: 17,
    examTypeId: 1,
    displayName: "TS Intermediate first year",
    name: "TS Intermediate First Year",
  },
  { examId: 40, examTypeId: 1, displayName: "CUET", name: "CUET" },
  { examId: 41, examTypeId: 2, displayName: "EAMCET", name: "EAMCET" },
  { examId: 69, examTypeId: 2, displayName: "RMO", name: "RMO" },
  {
    examId: 39,
    examTypeId: 1,
    displayName: "CBSE Grade 1",
    name: "CBSE Grade 1",
  },
  {
    examId: 38,
    examTypeId: 1,
    displayName: "CBSE Grade 2",
    name: "CBSE Grade 2",
  },
  {
    examId: 5,
    examTypeId: 1,
    displayName: "Aptitude Test",
    name: "Aptitude Test",
  },
  {
    examId: 70,
    examTypeId: 1,
    displayName: "Century Foundation Grade 10",
    name: "Century Foundation Grade 10",
  },
  {
    examId: 36,
    examTypeId: 1,
    displayName: "CBSE Grade 4",
    name: "CBSE Grade 4",
  },
  {
    examId: 37,
    examTypeId: 1,
    displayName: "CBSE Grade 3",
    name: "CBSE Grade 3",
  },
  {
    examId: 35,
    examTypeId: 1,
    displayName: "CBSE Grade 5",
    name: "CBSE Grade 5",
  },
  {
    examId: 4,
    examTypeId: 2,
    displayName: "Foundation Test",
    name: "Foundation Test",
  },
];

const chapterFormat = (eClass) => {

  return eClass?.chapterMeta?.map((chapter) => {
    const { chapterID, subjectId, examGrade, topics, examName, examId } =
      chapter;
    if (!chapterID || !topics) {
      return {};
    }
    return {
      chapterId: +chapterID,
      subjectId: +subjectId || eClass.subjectId,
      examId: examId || examNameToId(examName) || 1,
      examGrade: +examGrade || eClass.examGrade,
      topics: TopicFormat(topics),
    };
  });
};

const TopicFormat = (topics) => {
  return topics?.map((topic) => {
    const { topicID, subTopics } = topic;
    return {
      topicId: +topicID,
      subTopic: SubTopicFormat(subTopics),
    };
  });
};
const SubTopicFormat = (subTopics) => {
  return subTopics?.map((subTopic) => {
    const { subTopicID } = subTopic;
    return {
      subTopicId: +subTopicID,
    };
  });
};

const examNameToId = (exam) => {
  const examData = filteredCMSData?.find(
    (ex) => ex.displayName === exam || ex.name === exam
  );
  if (examData) {
    return +examData.examId;
  } else {
    return exam;
  }
};

const examsNameToId = (exams) => {
  return exams?.map((exam) => {
    const examData = filteredCMSData?.find(
      (ex) => ex.displayName === exam || ex.name === exam
    );
    return +examData?.examId || false;
  });
};
const subjectMetaFormat = (subjectMetaData) => {
  return subjectMetaData?.map((subjectMeta) => {
    const { examId, subjectId } = subjectMeta;
    return {
      examId: +examId,
      subjectId: +subjectId,
    };
  });
};
const examIdByGradeAndExamName = (exams , grade) =>{
  return exams?.map((exam)=>{
    const examData = filteredCMSData?.find((ex)=>ex.name == `${exam} Grade ${grade}`);
    return +examData?.examId
  })
}
const convertEClassToNewSchema = (eClass) => {
  const newEClass = {
    name: eClass.name,
    isDraft: eClass.isDraft || false,
    isActive: eClass.isActive || false,
    isPaid: eClass.isPaid || false,
    duration: eClass.timeDuration || 0,
    startTime: eClass.startTime || 0,
    endTime: eClass.endTime || 0,
    language: eClass.language || "",
    grades: eClass.grade?.toString()?.split(",")?.map(Number) || [],
    exams: examsNameToId(eClass.exams)?.[0] != false ? examsNameToId(eClass.exams) : examIdByGradeAndExamName(eClass.exams,eClass?.grade) ||[],
    subjectId:
      eClass.subjectID ||
      +eClass?.subjectMeta?.find(
        (eClass) => eClass.name == eClass?.subject
      )?.["subjectId"] ||
      0,
    examGrade: eClass.examGrade?.toString()?.split(",")?.map(Number) || [],
    recordings: eClass.recording || {},
    classType: eClass.classtype || "",
    source: {
        type: eClass.classSource?.type || 'agora',
        url: eClass.classSource?.url || '',
        meetingType: eClass.classSource?.meetingType || 'live',
    },
    createdAt: convertDateToTimestamp(eClass.createdAt),
    updatedAt: convertDateToTimestamp(eClass.updatedAt),
    createdBy: eClass.createdBy || 'swagger',
    updatedBy: eClass.updatedBy || 'swagger',
    tenantId: [1],
    subTenantId: eClass.subTenantId || [],
    classStatus: eClass.classSubStatus || "",
    meetingStatus: eClass.meetingStatus || "",
    teacher: eClass.teacher || "",
    meetingEndType: eClass.meetingEndType || "",
    events: {
      teacherStartedAt: eClass.teacherStartedAt || 0,
      teacherEndedAt: eClass.teacherMeetingEndedTime || 0,
      teacherAdmittedAt: eClass.teacherAdmitStudentsAt || 0,
    },
    eventTriggering: eClass.eventTriggering || {},
    isTeacherDisconnected: eClass.teacherDisconnected || false,
    teacherDisconnectedLastTime: eClass.teacherLastDiscounectedTime || 0,
    group: eClass.course || [],
    subGroup: eClass.batch || [],
    chapterMeta: chapterFormat(eClass) || [],
    subjectMeta: subjectMetaFormat(eClass.subjectMeta) || [],
    oldId : eClass._id,
    _id : eClass._id
  };
  return newEClass;
};

module.exports = {
  convertEClassToNewSchema,
};
