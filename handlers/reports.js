const reportsConvertion = (reports) => {
  return reports?.map((report) => {
    const {
      title,
      questions,
      class: eClass,
      student,
      tenant,
      status,
      role,
      teacher,
    } = report;

    return {
      title: title || "Report an Issue",
      questions: questions || [],
      eClass,
      userId: student.id || null,
      role: role || "Student",
      createdAt: Math.floor(Date.now() / 1000),
    };
  });
};

module.exports = {
  reportsConvertion,
};
