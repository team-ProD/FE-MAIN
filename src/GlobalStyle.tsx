import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
	${reset}

	* {
		box-sizing: border-box;
	}

	h1 {
		font-size: 28px;
	}
`;
