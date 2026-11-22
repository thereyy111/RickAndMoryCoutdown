const {onCall, HttpsError}=require('firebase-functions/v2/https');
const {initializeApp}=require('firebase-admin/app');
const {getAuth}=require('firebase-admin/auth');

initializeApp();

const ADMIN_EMAIL='rrobertsrayisthebestbud@gmail.com';

async function adminCheck(request){
  if(!request.auth)
    throw new HttpsError('unauthenticated','Sign in required.');

  const user=await getAuth().getUser(request.auth.uid);

  if(user.email!==ADMIN_EMAIL||!user.emailVerified)
    throw new HttpsError('permission-denied','Admin access denied.');

  return user;
}

exports.checkAdmin=onCall(async request=>{
  try{
    await adminCheck(request);
    return {admin:true};
  }catch(e){
    if(e.code==='permission-denied'||e.code==='unauthenticated')
      return {admin:false};
    throw e;
  }
});

exports.adminTerminal=onCall(async request=>{
  await adminCheck(request);

  const command=String(request.data?.command||'')
    .trim().toLowerCase();

  const outputs={
    help:'Commands: help, status, users, clear, close, logout',
    status:'System online. Firebase callable service responding.',
    users:'User listing is not enabled in this demo.',
    clear:'Terminal output cleared (client-side).',
    close:'Close the terminal panel in the page.',
    logout:'Use the sign-out button.'
  };

  return {
    output:outputs[command]||`Unknown command: ${command}. Type help.`
  };
});
