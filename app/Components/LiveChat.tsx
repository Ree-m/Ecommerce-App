"use client"
import { useRef } from 'react';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

export default function LiveChat() {
  const propertyId = process.env.NEXT_PUBLIC_PROPERTY_ID;
const widgetId = process.env.NEXT_PUBLIC_WIDGET_ID;

  console.log(propertyId,widgetId,"public public property")
  const tawkMessengerRef = useRef();
  const onLoad = () => {
    console.log('Tawk.to widget loaded!');
  };

  return (
    <div>

      <TawkMessengerReact
         propertyId="6552165f958be55aeaaf22c0"
        widgetId="1hf4aepgg"
        ref={tawkMessengerRef}
        onLoad={onLoad}
      />
    </div>
  );
}
