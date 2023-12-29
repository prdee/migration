const feedbacksData = (feedbacks) => {
  return feedbacks.map((feedback) => {
    const {
      student,
      title,
      tenant,
      status,
      class: eClass,
      createdAt,
      questions,
      updatedAt,
      id,
    } = feedback;
    return {
      eClass,
      title: title || "",
      student: student?.id || "",
      questions: questions,
      createdAt: createdAt || 0,
      updatedAt: updatedAt || 0,
    };
  });
};

module.exports = {
    feedbacksData
  };
  