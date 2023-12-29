const convertEnrollmentToNewSchema = (Enrollment) => {
    const newEnrollment = {
      _id: Enrollment._id,
      parentId: Enrollment.courses,
      childId: Enrollment.batches,
      isActive: Enrollment.isActive,
      isAdmin: Enrollment.isFromAdmin,
      enrolledDate: Enrollment.enrolmentDate,
      userId: Enrollment.student.id,
      unenrollmentData: Enrollment.unEnrollmentData || [],
    };
  
    return newEnrollment;
  };

  module.exports = {
    convertEnrollmentToNewSchema
  };
  