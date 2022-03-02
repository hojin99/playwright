const chromium = require('playwright').chromium;
const fs = require('fs');

console.log('start');

(async () => {
  // headless browser 실행
  const browser = await chromium.launch({
    headless: true,
    args: ["--font-render-hinting=none"],
  });
  // headless browser 새 페이지 열기
  const context = await browser.newContext();
  const page = await context.newPage();

  //  페이지 요청을 로깅 (디버깅을 위해)
  page.route('**', route => {
    console.log(route.request().url());
    route.continue();
  });

  // headless browser에서 보고서 export 페이지 오픈
  await page.goto(`http://localhost:9999/index.html`);

  console.log('page open');

  const pdfString = await page.evaluate(
    ({ reportUrl }) =>
      new Promise(async (resolve, reject) => {
        await GC.ActiveReports.Core.FontStore.registerFonts("fontsConfig.json");
        const report = new GC.ActiveReports.Core.PageReport();

        // console.log('step 1 - 보고서 load');
        await report.load(reportUrl);

        // console.log('step 2 - 보고서 실행');
        const doc = await report.run();

        // console.log('step 3 - 보고서 export');
        const result = await GC.ActiveReports.PdfExport.exportDocument(doc, {
          info: { author: "GrapeCity" },
        });

        // console.log('step 4 - Blob -> String');
        const reader = new FileReader();
        reader.readAsBinaryString(result.data);
        reader.onload = () => resolve(reader.result);
        reader.onerror = () =>
          reject("Error occurred while reading binary string");
      }),
    { reportUrl: "./report/ProductsList.rdlx-json" }
  );

  // console.log('step 5 - String -> Buffer -> File');
  const pdfData = Buffer.from(pdfString, "binary");
  fs.writeFileSync(`${process.cwd()}/ProductsList.pdf`, pdfData);
  
  console.log("export done");
  process.exit(0);
})();
