/**
 * function * (){}形式
 */
function * gen(){
    yield 1;
    yield 2;
    yield 3;
}
let gen_generator = gen();
let v = gen_generator.next();
console.log(v.value);
