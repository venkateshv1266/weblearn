const data = {
    users: [
        {
            name: "admin",
            email: "admin@example.com",
            password: "admin",
        },
        {
            name: "venki",
            email: "venki@gmail.com",
            password: "1234",
        }
    ],
    appName: "Web Learn",
    subTitle: "A learning platform on building blocks of a website with ICT",
    aboutHeading: "E-Learning Platform on Web Fundamentals",
    aboutContent: `
        A tool which provide the real world implementation of the important building blocks of the web fundamentals like working of the client server model, HTTP request and response, role of API’s and AJAX calls. It also provides useful resources for basic web fundamentals, and a complete beginner friendly road map for the full stack web development.
        `, 
    encodingContent: `
        Encoding is a function which takes the cover image, message to be encoded and the secret key as input. First the message is encrypted using AES-256 Algorithm using the secret key which is hashed with SHA-256 hash function. Then this encrypted message is encoded inside the cover image using LSB substitution method.
        `,
    encodingNoteContent: `
        Note: You can either provide the recipient Email ID so that he can decode the image using the Stego Image ID and Secret Key received through his mail or save the Stego Image and send the recipient through any third party file transfer platform (While transferring the image, image quality shouldn't be lost).
        `,
    decodingContent: `
        Decoding is a function which takes the stego image id, and the secret key as input. The stego image corresponding to the stego image id is retrieved from the database and the encrypted message encoded inside the image is now decoded using LSB decryption method which is then decrypted using AES-256 Algorithm.
    `,
    decodingNoteContent: `
        Note: You can decode the message either by explicitly uploading the stego image or by using the Stego Image ID and Secret Key which is received through the mail.
    `,
    realWorldContent: `
        Real-World Application allow students to progress and can five theme incentive to learn and care about what is going on withing the classroom. This material can be easier to understand when related to real-life issues through examples.
    `,
    roadmapContent : `
    A roadmap is a strategic plan that defines a goal or desired outcome and includes the major steps or milestones needed to reach it.
    It also serves as a communication tool, a high-level document that helps articulate strategic thinking—the why—behind both the goal and the plan for getting there.
    Although we at ProductPlan generally discuss the roadmap as a strategic tool for guiding the development of products, it can be used for all types of strategic initiatives.
    Indeed, businesses all over the world use our web-based roadmap software to create their organizations’ marketing plan, IT strategy, and others.
    When it comes to understanding the role of the roadmap, perhaps the most important concept to remember is that it is a strategic document, not a document that captures all of a plan’s details. With this in mind, it is also worth reviewing what it is not.
    `,
    usefulResourcesContent :   `
        Useful Resources section provides the best reference books on the basic web fundamentals and the full stack development 
        which the users can buy from online stores like Amazon. This section also provides the useful YouTube references, so that it will be easier for the end users to learn the skills effectively. It also provides some free cources available on the YouTube platform.
    `,
}

export default data;