import React from 'react';
import ReactDom from 'react-dom';

const App = () => {
	return (
		<div>
			<h1>Hello, World!</h1>
			<h3>From inside src/app.js, which is bundled to public/bundle.js</h3>
		</div>
	)
};

ReactDom.render(<App />, document.getElementById('root'));