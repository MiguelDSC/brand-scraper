import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";
import dotenv from "dotenv";
import urlExist from "url-exist";
import e from "express";
import { Switch } from "@headlessui/react";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/logos", async (req, res) => {
  (async () => {
    let allLogos = new Set();
    let finalLogos = [];
    const API = "http://www.google.com/s2/favicons?sz=256&domain=";

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    if (!Array.isArray(req.body.url)) {
      await page.goto(req.body.url);
      let grabLogos = new Set();

      let logos = await page.evaluate(() =>
        Array.from(document.images, (e) => e.src).filter((url) =>
          url.toLowerCase().includes("logo")
        )
      );

      let logosFromAlt = await page.evaluate(() =>
        Array.from(document.querySelectorAll("img[alt*='logo']")).map(
          (img) => img.src
        )
      );

      if (logos.length > 0) logos.forEach((item) => grabLogos.add(item));
      if (logosFromAlt.length > 0)
        logosFromAlt.forEach((item) => grabLogos.add(item));

      grabLogos.add(API + req.body.url);
      grabLogos.forEach((item) => {
        allLogos.add(item);
      });
    } else {
      for (let i in req.body.url) {
        await page.goto(req.body.url[i]);
        let logosList = new Set();

        let logos = await page.evaluate(() =>
          Array.from(document.images, (e) => e.src).filter((url) =>
            url.toLowerCase().includes("logo")
          )
        );

        let logosFromAlt = await page.evaluate(() =>
          Array.from(document.querySelectorAll("img[alt*='logo']")).map(
            (img) => img.src
          )
        );

        if (logos.length > 0) logos.forEach((item) => logosList.add(item));
        if (logosFromAlt.length > 0)
          logosFromAlt.forEach((item) => logosList.add(item));

        logosList.add(API + req.body.url[i]);
        logosList.forEach((img) => {
          allLogos.add(img);
        });
      }
    }

    allLogos.forEach((item) => {
      finalLogos.push(item);
    });

    await browser.close();
    res.send(finalLogos);
  })();
});

app.post("/colors", async (req, res) => {
  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    if (!Array.isArray(req.body.url)) {
      await page.goto(req.body.url);
      const grabColor = await page.evaluate(() => {
        let colr = new Set();
        document.body.querySelectorAll("*").forEach((n) => {
          if (window.getComputedStyle(n).backgroundColor != "rgba(0, 0, 0, 0)")
            colr.add(window.getComputedStyle(n).backgroundColor);
        });
        colr = [...colr];
        return colr;
      });

      await browser.close();
      res.send(grabColor);
    } else {
      let allColors = new Set();
      let colorArray = [];

      for (let i in req.body.url) {
        await page.goto(req.body.url[i]);
        const grabColor = await page.evaluate(() => {
          let colr = new Set();
          document.body.querySelectorAll("*").forEach((n) => {
            if (
              window.getComputedStyle(n).backgroundColor != "rgba(0, 0, 0, 0)"
            )
              colr.add(window.getComputedStyle(n).backgroundColor);
          });
          colr = [...colr];
          return colr;
        });

        grabColor.forEach((element) => {
          allColors.add(element);
        });
      }

      allColors.forEach((item) => {
        colorArray.push(item);
      });

      await browser.close();
      res.send(colorArray);
    }
  })();
});

app.post("/buttons", async (req, res) => {
  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    if (!Array.isArray(req.body.url)) {
      await page.goto(req.body.url);

      const getButtons = await page.evaluate(() => {
        const rawButtonArray = [...document.getElementsByTagName("button")];

        const buttonArray = rawButtonArray.map((button) => {
          let style = getComputedStyle(button);

          return {
            id: `${style.backgroundColor}${style.color}${style.border}${style.borderRadius}`,
            backgroundColor: style.backgroundColor,
            color: style.color,
            border: style.border,
          };
        });

        const uniqueIds = new Set(buttonArray.map(({ id }) => id));
        const uniqueItems = [...uniqueIds].map((id) =>
          buttonArray.find((button) => button.id === id)
        );

        return uniqueItems.filter(
          (button) =>
            button.backgroundColor !== "rgba(0, 0, 0, 0)" &&
            button.backgroundColor !== button.color
        );
      });
      browser.close();
      res.send(getButtons);
    } else {
      let allBtns = [];
      let finalArray = [];

      for (const i in req.body.url) {
        await page.goto(req.body.url[i]);
        const getButtons = await page.evaluate(() => {
          const rawButtonArray = [...document.getElementsByTagName("button")];

          let tempArray = rawButtonArray.map((button) => {
            let style = getComputedStyle(button);

            return {
              id: `${style.backgroundColor}${style.color}${style.border}${style.borderRadius}`,
              backgroundColor: style.backgroundColor,
              color: style.color,
              border: style.border,
            };
          });

          return tempArray;
        });

        getButtons.forEach((item) => {
          allBtns.push(item);
        });

        const uniqueIds = new Set(allBtns.map(({ id }) => id));
        const uniqueItems = [...uniqueIds].map((id) =>
          allBtns.find((button) => button.id === id)
        );

        finalArray = uniqueItems.filter(
          (button) =>
            button.backgroundColor !== "rgba(0, 0, 0, 0)" &&
            button.backgroundColor !== button.color
        );
      }
      browser.close();
      res.send(finalArray);
    }
  })();
});

app.post("/fonts", async (req, res) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  let allFonts = [];
  // let grabFontStyles = [];
  let tag = "i am a tag";
  const tagsArray = ["h1", "h2", "h3", "h4", "p"];

  // if (Array.isArray(req.body.url)) {
  for (let i = 0; i < req.body.url.length; i++) {
    let getFontStyles = [];
    await page.goto(req.body.url[i]);

    for (let j = 0; j < tagsArray.length; j++) {
      tag = tagsArray[j];
      let fontStyles = [];
      fontStyles = await page.evaluate((tag) => {
        try {
          const elements = document.getElementsByTagName(tag);
          const elementStyles = getComputedStyle(elements[0]);

          const neededStyles = [
            elementStyles.fontFamily,
            elementStyles.fontSize,
            elementStyles.color,
          ];
          return neededStyles;
        } catch (error) {
          // when an element doesn't exist return empty
          return [];
        }
      }, tag);
      getFontStyles.push(fontStyles);
    }
    allFonts.push(getFontStyles);
  }

  await browser.close();
  res.send(allFonts);
  // } else {
  //   for (let i = 0; i < tagsArray.length; i++) {
  //     await page.goto(req.body.url);
  //     tag = tagsArray[i];
  //     const fontStyles = await page.evaluate((tag) => {
  //       try {
  //         const elements = document.getElementsByTagName(tag);
  //         const elementStyles = getComputedStyle(elements[0]);

  //         const neededStyles = [
  //           elementStyles.fontFamily,
  //           elementStyles.fontSize,
  //           elementStyles.color,
  //         ];
  //         return neededStyles;
  //       } catch (error) {
  //         // when an element doesn't exist return empty
  //         return [];
  //       }
  //     }, tag);
  //     grabFontStyles.push(fontStyles);
  //   }
  //   await browser.close();
  //   res.send(grabFontStyles);
  // }
});

app.post("/check", async (req, res) => {
  const exists = await urlExist(req.body.url);

  res.send(exists);
});

app.listen(3000, () => {
  console.log(`listening on port ${3000}`);
});
