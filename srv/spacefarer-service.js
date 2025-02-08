const cds = require("@sap/cds");
const nodemailer = require("nodemailer");
class SpacefarerService extends cds.ApplicationService {
  async init() {
    const db = await cds.connect.to("db");
    const { Spacefarers } = db.entities;

    // BEFORE event: Validate & Enhance Spacefarer Skills
    this.before("CREATE", Spacefarers, async (req) => {
      const { stardustCollection, wormholeNavigation, ID, name } = req.data;
      // Validate input values
      if (stardustCollection < 0) {
        req.error(400, "Stardust collection cannot be negative.");
      }
      if (wormholeNavigation < 0 || wormholeNavigation > 1000) {
        req.error(400, "Wormhole Navigation skill must be between 0 and 1000.");
      }
      // Enhance new spacefarer skills (Bonus Stardust!)
      await UPDATE(Spacefarers)
        .with({
          stardust: stardustCollection + 10,
          wormholeSkill: wormholeNavigation + 10,
        })
        .where({ ID: ID });
      console.log(`🚀 Preparing ${name} for space adventure!`);
    });

    // AFTER event: Send notification email
    this.after("CREATE", Spacefarers, async (data, req) => {
      const emailService = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
      const message = {
        to: data.email,
        subject: `Welcome to the Galactic Adventure, ${data.name}!`,
        text: `Dear ${data.name},\n\nCongratulations on embarking on your cosmic journey!
            You now have ${data.stardust} stardust and a Wormhole Navigation skill of ${data.wormholeSkill}.
            Best of luck exploring the SAP galaxy! 🚀✨\n\n- Galactic Command`,
      };
      try {
        await emailService.sendMail(message);
        console.log(`📧 Cosmic notification sent to ${data.email}`);
      } catch (error) {
        console.error("⚠️ Failed to send cosmic notification:", error);
      }
    });

    this.on("UpdateStardust", async (req) => {
      const { spacefarerID, newStardust } = req.data;
      // Validate input
      if (newStardust < 0) {
        return req.error(400, "Stardust cannot be negative");
      }
      // Update the spacefarer's stardust
      const result = await UPDATE(Spacefarers)
        .set({ stardust: newStardust })
        .where({ ID: spacefarerID });
      // Check if update was successful
      if (result === 0) {
        return req.error(404, `Spacefarer with ID ${spacefarerID} not found`);
      }
      // Return success message
      return {
        message: `Updated stardust to ${newStardust} for spacefarer ${spacefarerID}`,
      };
    });

    // Handler for ChangeSpaceSuitColor action
    this.on("ChangeSpaceSuitColor", async (req) => {
      const { spacefarerID, newColor } = req.data;

      // Update the spacefarer's suit color
      const result = await UPDATE(Spacefarers)
        .set({ spacesuitColor: newColor })
        .where({ ID: spacefarerID });
      // Check if update was successful
      if (result === 0) {
        return req.error(404, `Spacefarer with ID ${spacefarerID} not found`);
      }
      // Return success message
      return {
        message: `Updated space suit color to ${newColor} for spacefarer ${spacefarerID}`,
      };
    });
    this.on("CreateSpacefarer", async (req) => {
      const {
        name,
        stardust,
        wormholeSkill,
        originPlanet,
        spacesuitColor,
        email,
        department_ID,
        position_ID,
      } = req.data;

      const newSpacefarer = await INSERT.into(Spacefarers).entries({
        name,
        stardust,
        wormholeSkill,
        originPlanet,
        spacesuitColor,
        email,
        department_ID,
        position_ID,
      });

      return newSpacefarer;
    });
    return super.init();
  }
}
module.exports = SpacefarerService;
