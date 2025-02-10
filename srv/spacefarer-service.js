const cds = require("@sap/cds");
const nodemailer = require("nodemailer");

const emailService = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
const sendEmail = async (data) => {
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
};

class SpacefarerService extends cds.ApplicationService {
  async init() {
    const db = await cds.connect.to("db");
    const { Spacefarers } = db.entities;

    this.before("CREATE", Spacefarers, async (req) => {
      const { stardust, wormholeSkill, name } = req.data;
      if (stardust < 0) {
        req.error(400, "Stardust collection cannot be negative.");
      }
      if (wormholeSkill < 0 || wormholeSkill > 1000) {
        req.error(400, "Wormhole Navigation skill must be between 0 and 1000.");
      }
      req.data.stardust += 10;
      req.data.wormholeSkill += 10;
      console.log(`🚀 Preparing ${name} for space adventure!`);
    });

    this.after("CREATE", Spacefarers, async (data, req) => {
      await sendEmail(data);
    });

    this.on("UpdateStardust", async (req) => {
      const { spacefarerID, newStardust } = req.data;
      if (newStardust < 0) {
        return req.error(400, "Stardust cannot be negative");
      }
      const result = await UPDATE(Spacefarers)
        .set({ stardust: newStardust })
        .where({ ID: spacefarerID });
      if (!result) {
        return req.error(404, `Spacefarer with ID ${spacefarerID} not found`);
      }
      return {
        message: `Updated stardust to ${newStardust} for spacefarer ${spacefarerID}`,
      };
    });

    this.on("ChangeSpaceSuitColor", async (req) => {
      const { spacefarerID, newColor } = req.data;

      const result = await UPDATE(Spacefarers)
        .set({ spacesuitColor: newColor })
        .where({ ID: spacefarerID });
      if (!result) {
        return req.error(404, `Spacefarer with ID ${spacefarerID} not found`);
      }
      return {
        message: `Updated space suit color to ${newColor} for spacefarer ${spacefarerID}`,
      };
    });
    this.on("CreateSpacefarer", async (req) => {
      // i not managed to use the default CREATE function so thats why i did this and also added in the before and after event because those not thrigger on this
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
        stardust: stardust + 10,
        wormholeSkill: wormholeSkill + 10,
        originPlanet,
        spacesuitColor,
        email,
        department_ID,
        position_ID,
      });
      await sendEmail(newSpacefarer);
      return newSpacefarer;
    });

    return super.init();
  }
}
module.exports = SpacefarerService;
