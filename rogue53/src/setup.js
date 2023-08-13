Module.char_codes = new Array();
Module.resolve_ch = null;;
Module.new_message = function (ch) {
	let m = new MessageEvent("message", {
		data: {
			"type": "input",
			"ch": ch.charCodeAt(0),
		}
	});
	return m;
};
Module.handle_message = function(e) {
	let ch = e.data.ch;
	if (this.resolve_ch === null) {
		this.char_codes.push(ch);
		console.log("add char to queue", ch);
	} else {
		console.log("resolve char from message", ch);
		let resolve = this.resolve_ch;
		this.resolve_ch = null;
		resolve(ch);
	}
};
Module.getchar = async function() {
        const readCh = () => new Promise(resolve => {
		let ch = this.char_codes.shift();
		if (ch !== undefined) {
			console.log("resolve char from queue", ch);
			resolve(ch);
		} else {
			console.log("send resolve to module");
			this.resolve_ch = resolve;
		}
	});
        return await readCh();
}
