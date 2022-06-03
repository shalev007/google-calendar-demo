const google = require("googleapis");
const dotenv = require("dotenv");
dotenv.config();
(async (_) => {
  const oauth2Client = new google.Auth.OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  const calendar = new google.calendar_v3.Calendar({
    auth: oauth2Client,
  });

  const googleEvent = {
    title: "Google Calendar",
    description: "Google Calendar",
    location: "",
    start: {
      dateTime: new Date(),
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: new Date(),
      timeZone: "America/Los_Angeles",
    },
    reminders: {
      useDefault: false,
      overrides: [
        {
          method: "popup",
          minutes: 10,
        },
      ],
    },
    colorId: "1",
  };

  const createdEvent = await calendar.events.insert({
    calendarId: "primary",
    requestBody: googleEvent,
  });
})();
