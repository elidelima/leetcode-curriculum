import process from "process";

import { getActiveDailyCodingChallengeQuestionWithDateValidation as getPotd } from "@code-chronicles/leetcode-api";

import { sleep } from "@code-chronicles/leetcode-api/src/sleep";

import { readScriptData, writeScriptData } from "./readScriptData";
import { readSecrets } from "./readSecrets";
import { sendDiscordMessage } from "./sendDiscordMessage";

async function main(): Promise<void> {
  // TODO: maybe create the file from a template if it doesn't exist
  const secrets = await readSecrets();

  while (true) {
    const { date, question: potd } = await getPotd();
    const scriptData = await readScriptData();

    if (
      scriptData.lastPostedDate != null &&
      date === scriptData.lastPostedDate
    ) {
      const nextDayInSeconds = (() => {
        const d = new Date(0);
        const [year, month, day] = date.split("-").map(Number);
        d.setUTCFullYear(year, month - 1, day);
        return d.getTime() / 1000 + 24 * 60 * 60;
      })();

      const secondsToSleep = Math.max(
        60,
        Math.floor(nextDayInSeconds - Date.now() / 1000),
      );
      console.log(
        `Already posted the problem for ${date}, will sleep ${secondsToSleep} seconds until the next day.`,
      );
      await sleep(secondsToSleep * 1000);
      continue;
    }

    const potdLink = `https://leetcode.com/problems/${potd.titleSlug}/`;
    const message = `New LeetCode problem of the day! [${potd.questionFrontendId}. ${potd.title}](${potdLink})`;
    await sendDiscordMessage(secrets, message);
    await writeScriptData({ lastPostedDate: date });
    console.log(message);
    break;
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
