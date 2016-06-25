import readline from 'readline';
import colors from 'colors';

import CheddarScope from '../interpreter/core/env/scope';

import NIL from '../interpreter/core/consts/nil';

import cheddar from '../interpreter/exec';
import tokenizer from '../tokenizer/tok';

import stdlib from '../stdlib/stdlib';
let USI = 0;

const CONSTANT = { Writeable: false };
let GLOBAL_SCOPE = new CheddarScope(null, stdlib);
var windw = Function('return this')();
windw.Chedz = function input(STDIN) {

    if (STDIN === 'exit') return;
    if (STDIN === 'help') { /* Helpful text */ }

    let Tokenizer = new tokenizer(STDIN, 0);
    let Result = Tokenizer.exec();

    let Executor = new cheddar(Result, GLOBAL_SCOPE);
    let Output = Executor.exec();

    if (Output) {

		if (typeof Output === "string") {
			throw new Error(Output, "Error");
		} else if (Output instanceof NIL) {
			// do nothing?
		} else if (!Output) {
			console.log(Output);
		} else if (Output.constructor.Name === "String") {
			console.log(`"${Output.value}"`, '', 'magenta');
		} else if (Output && Output.constructor.Cast && Output.constructor.Cast.has('String')) {
			console.log(
				`${Output.constructor.Cast.get('String')(Output).value}`,
			'', 'magenta');
		} else if (Output instanceof CheddarScope) {
			console.log(`< Instance of "${Output.constructor.Name}" >`, '', 'orange');
		} else if (Output.prototype instanceof CheddarScope) {
			console.log(`< Class "${Output.Name}" >`, '', 'orange');
		} else if (typeof Output === "symbol") {
			console.log(Output.toString(), '', 'red');
		} else {
			console.log(`< Unprintable object of class "${Output.constructor.name.magenta}" with literal value ${Output.magenta} >`, '', 'orange');
		}
	}
}