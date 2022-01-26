import toUint8Array from 'urlb64touint8array';

const config = {
   pushKey: 'BCbW8hnGkLmzLIz5a4Lui2FyTe3p0wbDyjVwmlg4kAGw_nQ6XUh3jUI3bOVQkHmzecj02hcY1so58p4BsJpuG44',
   appSyncUrl: 'https://crjpzqbzczhrvnozhrq57zjomu.appsync-api.us-east-1.amazonaws.com/graphql',
   appSyncApiKey: 'da2-iqqd4gzivng4dowtol5wxuulf4',
};

const subscribe = async (topic) => {
   const swReg = await navigator.serviceWorker.register("/sw.js");
   
   const subscription = await swReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: toUint8Array(config.pushKey),
   });
      
   fetch(config.appSyncUrl, {
      method: "POST",
      headers: { "x-api-key": config.appSyncApiKey },
      body: JSON.stringify({ query: `mutation($topic: String, $subscription: String) {subscribe(topic: $topic, subscription: $subscription)}`, 
         variables: { topic, subscription: JSON.stringify(subscription) } })
   });
};

export default subscribe;
