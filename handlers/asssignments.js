const convertToAssignmentSchema = (data) => {
  const {
    _id,
    ruleId,
    subjectMeta,
    batches,
    courses,
    examType,
    grade,
    subjectId,
    time,
    eClassId
  } = data;

  const toc =
    subjectMeta?.map((subject) => ({
      examId: +subject.examId || examType,
      gradeId: grade?.toString()?.split(",")?.map(Number) || grade,
      subjectId: +subject.subjectId || subjectId,
    })) || [];

  const assignmentData = {
    // _id,
    ruleId,
    time,
    toc,
    type: "assignment",
    parentType: "liveclass",
    parentId: eClassId,
    isActive: true,
  };

  return assignmentData;
};

module.exports = {
    convertToAssignmentSchema
  };
  
