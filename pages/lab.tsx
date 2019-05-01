import React, { useEffect } from 'react';
// import '@webcomponents/webcomponentsjs/webcomponents-bundle';
// import '@ionic/core/loader/index.js';
// import '@ionic/core/dist/index.js';
// import '@ionic/core/css/core.css';
// import '@ionic/core/css/display.css';
// import '@ionic/core/css/normalize.css';
// import '@ionic/core/css/structure.css';
// import '@ionic/core/css/typography.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'vaadin-button': any;
      'ion-button': any;
    }
  }
}

function lab() {
  useEffect(() => {
    // import('@vaadin/vaadin-button/vaadin-button.js');
  }, []);
  return (
    <div>
      Laboratory
      {/* <ion-button>Ion Button</ion-button> */}
    </div>
  );
}
export default lab;
