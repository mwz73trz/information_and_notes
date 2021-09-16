const BASE_URL = "http://localhost:8000/"

const getTokenInit = (token) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'authorization': `JWt ${token}`
    }
  }
}

const tryCatchFetch = async (url, init) => {
  try {
    let response = await fetch(url, init)
    if (response.ok) {
      console.log("status", response.status)
      if (response.status !== 204) {
        let data = await response.json()
        return data
      }else {
        return { "success": true }
      }
    }
  }catch (error) {
    console.error(":ERR:", error)
    return null
  }
}

const doLogin = async (credentials) => {
  let url = `${BASE_URL}login/`
  let init = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }
  return await tryCatchFetch(url, init)
}

const getSubjects = async (token) => {
  let url = `${BASE_URL}api/subjects/`
  return await tryCatchFetch(url, getTokenInit(token))
}

const getSubjectById = async (subjectId, token) => {
  let url = `${BASE_URL}api/subjects/${subjectId}`
  return await tryCatchFetch(url, getTokenInit(token))
}

const getTitle = async (titleId, token) => {
  let url = `${BASE_URL}api/titles/${titleId}/`
  return await tryCatchFetch(url, getTokenInit(token))
}

const createSubject = async (newSubjectParams, token) => {
  let url = `${BASE_URL}api/subjects/`
  let init = getTokenInit(token)
  init["method"] = "POST"
  init["body"] = JSON.stringify(newSubjectParams)
  return await tryCatchFetch(url, init)
}

const deleteSubject = async (subjectId, token) => {
  let url = `${BASE_URL}api/subjects/${subjectId}/`
  let init = getTokenInit(token)
  init["method"] = "DELETE"
  return await tryCatchFetch(url, init)
}

const myExport = {
  doLogin,
  getSubjects,
  getSubjectById,
  getTitle,
  createSubject,
  deleteSubject
}

export default myExport;