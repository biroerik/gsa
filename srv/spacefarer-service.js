const cds = require("@sap/cds");

module.exports = cds.service.impl(async function () {
  const { Spacefarers } = this.entities;

  // BEFORE event: Validate & Enhance Spacefarer Skills
  this.before("CREATE", Spacefarers, async (req) => {
    const { stardustCollection, wormholeNavigation } = req.data;

    // Validate input values
    if (stardustCollection < 0) {
      req.error(400, "Stardust collection cannot be negative.");
    }
    if (wormholeNavigation < 0 || wormholeNavigation > 1000) {
      req.error(400, "Wormhole Navigation skill must be between 0 and 1000.");
    }

    // Enhance new spacefarer skills (Bonus Stardust!)
    req.data.stardustCollection = stardustCollection + 50; // Giving bonus 50 stardust!
    req.data.wormholeNavigation = Math.min(wormholeNavigation + 10, 1000); // Boost skill but max 1000

    console.log(`🚀 Preparing ${req.data.firstName} for space adventure!`);
  });

  // AFTER event: Send notification email
  this.after("CREATE", Spacefarers, async (data, req) => {
    const emailService = await cds.connect.to("email-service"); // Assuming an external email service

    const message = {
      to: data.email,
      subject: `Welcome to the Galactic Adventure, ${data.firstName}!`,
      text: `Dear ${data.firstName},\n\nCongratulations on embarking on your cosmic journey! 
            You now have ${data.stardustCollection} stardust and a Wormhole Navigation skill of ${data.wormholeNavigation}. 
            Best of luck exploring the SAP galaxy! 🚀✨\n\n- Galactic Command`,
    };

    try {
      await emailService.sendEmail(message);
      console.log(`📧 Cosmic notification sent to ${data.email}`);
    } catch (error) {
      console.error("⚠️ Failed to send cosmic notification:", error);
    }
  });
});
