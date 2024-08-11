import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';


const isPWA2 = () => {
  return window.matchMedia('(display-mode: standalone)').matches;
};



const InstallPromptComponent = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [count , setCount] = useState(0);
  const [isPWA, setIsPWA] = React.useState(false);
  useEffect(() => {
    setIsPWA(isPWA2());
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('beforeinstallprompt event fired.');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    console.log("Differed Prompt ", deferredPrompt)
    
    
    

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, [count]);

  const handleInstallClick = () => {
    console.log(deferredPrompt)
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          toast.success('App installed successfully!');
        } else {
          toast.error('App installation was dismissed.');
        }
        setDeferredPrompt(null);
      }).catch((error) => {
        toast.error('Failed to handle installation prompt.');
        console.error('Install prompt error:', error);
      });
    } else {
      toast.error('Install prompt not available. 😢');
    }
  };

  return (<>
  {
    deferredPrompt &&
    <div className="fixed bottom-4 right-4 p-4  mx-20 mb-4 text-white rounded-lg shadow-lg flex items-center" onClick={handleInstallClick}>
      {/* <p className="mr-4">Install XaMawo for a better experience!</p>
      <button
        onClick={handleInstallClick}
        className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold"
      >
        Install
      </button> */}
       <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse"><button className="w-full sm:w-auto bg-gray-700 hover:bg-gray-700 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-600 "><svg className="me-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg><div className="text-left rtl:text-right"><div className="mb-1 text-xs"> iOS, MAC</div><div className="-mt-1 font-sans text-sm font-semibold">Download</div></div></button><button className="w-full sm:w-auto bg-gray-700 hover:bg-gray-700  text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-600 "><svg className="me-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"></path></svg><div className="text-left rtl:text-right"><div className="mb-1 text-xs">Android, Windows</div><div className="-mt-1 font-sans text-sm font-semibold">Download</div></div></button></div>
    </div> 
  }
    {/* <div className="fixed bottom-4 right-4 p-4 m-4  text-white rounded-lg shadow-lg flex items-center border"> <a href="/profile" onClick={()=> setCount(count+1)} >Install our app</a></div> */}

    {isPWA ? (
        <></>
      ) : (
        <a href='/profile'>
        <div className="fixed bottom-4 left-4 p-4 m-8 text-black rounded-lg shadow-lg flex items-center border dark:text-white" onClick={handleInstallClick}>
       Install our app
    </div> </a>
      )}

    </>
  );
};

export default InstallPromptComponent;
