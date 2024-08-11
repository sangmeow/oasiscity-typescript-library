import { randomNumber, randomString, randomStringNumber, randomBoolean, randomDate } from "./libs/random";

const main = async () => {
	console.log(randomNumber(1, 10));
	console.log(randomString(10));
	console.log(randomStringNumber(10));
	console.log(randomBoolean);
	console.log(randomDate(new Date(), new Date()));
};

main();
