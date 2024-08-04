import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const InstallPromptComponent = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [count , setCount] = useState(0);

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
    <div className="fixed bottom-4 right-4 p-4 bg-blue-600 text-white rounded-lg shadow-lg flex items-center">
      <p className="mr-4">Install XaMawo for a better experience!</p>
      <button
        onClick={handleInstallClick}
        className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold"
      >
        Install
      </button>
    </div>
  }
    </>
  );
};

export default InstallPromptComponent;
