import React, { useState } from 'react';

export const App = () => {
   
  const [qrcode,setQrcode]=useState('');
  const [img,setImg]=useState('');
  const [loading,setLoading]=useState(false);

  async function generate(){
    setLoading(true)
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrcode)}`;
      setImg(url)
    }
    catch(error){
      console.log('Error geberating QR code',error);
    }
    finally{
      setLoading(false)
    }
  }

  function download(){
    fetch(img).then((response)=>response.blob()).then((blob)=>{
      const link=document.createElement('a');
      link.href=URL.createObjectURL(blob);
      link.download='qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((error)=>{
      console.log("Error downloading qrcode",error)
    })
  }


  return (
    <>
    <div className='container'>

      <div className='title'>
         <p>QR CODE GENERATOR</p>
      </div>
      <div className='loading'>
      {loading && <p>Please wait...</p>}
      </div>
      <div className='qrimg'>
       {img && <img src={img} alt="" width={'200px'} height={'200px'} /> }
      </div>

      <div className='field'>
          <p>Data for QR code:</p>
          <input type="text" value={qrcode} onChange={(e)=>setQrcode(e.target.value)} />
      </div>

      <div className='btns'>
        <button className='generate' onClick={generate} disabled={loading}>Generate QR Code</button>
        <button className='download' onClick={download}>Download QR Code</button>
      </div>

    </div>
    </>
  )
}
