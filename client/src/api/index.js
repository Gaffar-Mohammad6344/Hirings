export async function postContact(data){
  return fetch('/api/contact', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)})
}

export async function postCandidate(formData){
  return fetch('/api/candidates', {method:'POST', body:formData})
}
