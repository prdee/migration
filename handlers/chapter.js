const convertToChaptertestSchema = (data) => {
  const { _id, chapterId, subjectId, examId, grade, date, ruleId } = data;

  const chaptertestData = {
    ruleId,
    date: date,
    isActive: true,
    parentType: "course",
    parentId: _id,
    toc: {
      exam: +examId,
      grade: +grade,
      subject: +subjectId,
      chapter: +chapterId,
    },
    // _id: new Types.ObjectId(),
  };

  return chaptertestData;
};


  
module.exports = {
    convertToChaptertestSchema
  };
  