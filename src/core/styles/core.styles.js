//colors: https://coolors.co/232b42-a38660-c69645-8b9396-d5e1e8

import styled, { injectGlobal } from 'styled-components';

// Root Component Container
const Container = styled.div``;

// Global Styles
injectGlobal`

/* Fonts */
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');

html {
    background: #232B42;
    color: #D5E1E8;
}

/* unvisited link */
a:link {
    color: #C69645;
}

/* visited link */
a:visited {
    color: #A38660;
}

/* mouse over link */
a:hover {
    color: #C69645;
}

/* selected link */
a:active {
    color: #A38660;
}

*, *:before, *:after {
    box-sizing: inherit;
}

body {
    margin: 0;
    padding:0;
    font-family:'Lato',sans-serif;
}
`;

export { Container };
