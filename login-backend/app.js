import bcrypt from 'bcrypt';

const password = 'password1';

const hash = await bcrypt.hash(password, 10);

console.log(`Hash: ${hash}`);
console.log(password);