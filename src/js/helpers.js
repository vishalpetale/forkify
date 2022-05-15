import { TIMEOUT_SEC } from './config';

function timeout(s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long. Timeout after ${s} seconds.`));
    }, s * 1000);
  });
}

export async function AJAX(url, uploadData = undefined) {
  try {
    const fetchPromise = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}.(${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
}

/*
export async function getJSON(url) {
  try {
    const fetchPromise = fetch(url);
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}.(${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
}
export async function sendJSON(url, uploadData) {
  try {
    const fetchPromise = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}.(${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
}*/
