const faqmigration = (faqs)=>{
    return faqs?.map((faq)=>{
        return {
            question: faq.questions,
            answer: faq.answers,
            isActive: faq.isActive,
            createdAt: faq.createdAt,
            updatedAt: faq.updatedAt,
          }
    })
}

module.exports = {
    faqmigration
  };