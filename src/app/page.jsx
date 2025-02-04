'use client'

import { Fragment, useEffect, useState } from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export default function Home() {

    const[color, setColor] = useState("azul");
    const[hash, setHash] = useState("");

    useEffect(() => {

      const fetchData = async () => {
          const url = `http://entradas.t18.uy/?hash=${hash}`;

          try {

              const response = await fetch(url, {
                  method: 'GET'
              });

              if (response.ok) {
                  setColor("verde");
              }else{
                setColor("rojo");
                throw new Error('Error');
              }

              const data = await response.json();
            

          } catch (error) {
              console.error('Error:', error);
          }
      };
      fetchData();
      console.log(hash);
  }, [hash]);

    return (
      <Fragment>
      <div>
      <BarcodeScannerComponent
        className="qr"
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setHash(result.text);
          else setColor("rojo");
        }}
      />
      </div>
      
      <div className={`estado ${color === "verde" ? 'verde' : color === "rojo" ? 'rojo' : ''}`}></div>
      </Fragment>
    );

}
