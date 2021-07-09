require('dotenv').config()

const {Builder, By, Key, until} = require('selenium-webdriver');
const firefox   = require('selenium-webdriver/firefox');

async function example() {
    let options = new firefox.Options();
    //Below arguments are critical for Heroku deployment
    options.addArguments("--headless");
    options.addArguments("--disable-gpu");
    options.addArguments("--no-sandbox");

    let driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
    try {
        // Navigate to Url
        await driver.get(process.env.url);

        // login
        await driver.findElement(By.name('txt_login')).sendKeys(process.env.username);
        await driver.findElement(By.id('txt_pass_normal')).sendKeys(process.env.password);
        await driver.findElement(By.xpath("//*[@id=\"dialog_link\"]")).click()

        // move to 'saisie des temps'
        await driver.findElement(By.xpath("//table/tbody/tr[1]/td/table/tbody/tr[2]/td/table/tbody/tr/td[2]")).click();
        await driver.findElement(By.xpath("//table/tbody/tr[2]/td/div/table[2]/tbody/tr/td")).click();

        // select 'aout'
        await driver.findElement(By.xpath("//*[@id=\"ddl_month\"]/option[8]")).click();

        // add a value
        await driver.findElement(By.xpath("//*[@id=\"TD_548_2\"]")).click();
        await driver.findElement(By.xpath("//*[@id=\"val_100\"]")).click();

        //save
        await driver.findElement(By.xpath("//*[@id=\"bouton_enregistrer\"]")).click();

        let txt_save = await driver.findElement(By.className('data_saved_text'));
        if (txt_save){console.log(await txt_save.getText())} else {console.log('Fail')}
    }
    finally{
        driver.quit();
    }
}
  
example();