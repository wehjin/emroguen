Module.char_codes = new Array();
Module.resolve_ch = null;;
Module.new_message = function (ch) {
	if (typeof ch != "number") {
		ch = ch.charCodeAt(0);
	}
	let m = new MessageEvent("message", {
		data: {
			"type": "input",
			"ch": ch,
		}
	});
	return m;
};
Module.handle_message = function(e) {
	let ch = e.data.ch;
	if (this.resolve_ch === null) {
		this.char_codes.push(ch);
	} else {
		let resolve = this.resolve_ch;
		this.resolve_ch = null;
		resolve(ch);
	}
};
Module.getchar = async function() {
        const readCh = () => new Promise(resolve => {
		let ch = this.char_codes.shift();
		if (ch !== undefined) {
			resolve(ch);
		} else {
			this.resolve_ch = resolve;
		}
	});
        return await readCh();
}

if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
	console.log('todo: add message listener');
} else {
	console.log('add keypress listener');
	window.addEventListener('keypress', (event) => {
		let ascii, key = event.key;
		console.log('got key', key);
		if(key.length == 1) {
			ascii = key.charCodeAt(0);
			if(ascii < 128 && event.ctrlKey) {
				ascii = ascii & 0x1f;
			}
		}
		if( typeof ascii == "number" && ascii < 128) {
			console.log(`ASCII code ${ascii} entered from keyboard`);
			const message = Module.new_message(ascii);
			Module.handle_message(message);
		} else {
			console.log( key + " is not in the ASCII character set");
		}
	});
}
