const serverEndpoint = `http://localhost:3000`;

export const getButtonStyle = async (urlArray: string[]) => {
  const buttonsEndpoint = `${serverEndpoint}/buttons`;

  try {
    const response = await fetch(buttonsEndpoint, {
      method: "POST",
      body: JSON.stringify({
        url: urlArray,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) throw new Error("fetching data problem, buttons");
    const result = await response.json();
    return result;
  } catch (e) {
    if (e instanceof Error) throw e;
  }
};

export const getFontStyle = async (urlArray: string[]) => {
  const fontsEndpoint = `${serverEndpoint}/fonts`;

  try {
    const response = await fetch(fontsEndpoint, {
      method: "POST",
      body: JSON.stringify({
        url: urlArray,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) throw new Error("fetching data problem, fonts");
    const result = await response.json();
    return result;
  } catch (e) {
    if (e instanceof Error) throw e;
  }
};

export const getColorStyle = async (urlArray: string[]) => {
  const colorEndpoint = `${serverEndpoint}/colors`;

  try {
    const response = await fetch(colorEndpoint, {
      method: "POST",
      body: JSON.stringify({
        url: urlArray,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) throw new Error("fetching data problem, colors");
    const result = await response.json();
    return result;
  } catch (e) {
    if (e instanceof Error) throw e;
  }
};

export const getLogos = async (urlArray: string[]) => {
  const logoEndpoint = `${serverEndpoint}/logos`;

  try {
    const response = await fetch(logoEndpoint, {
      method: "POST",
      body: JSON.stringify({
        url: urlArray,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) throw new Error("fetching data problem, logos");
    const result = await response.json();
    return result;
  } catch (e) {
    if (e instanceof Error) throw e;
  }
};

export const getStatus = async (url: string) => {
  const testEndpoint = `${serverEndpoint}/check`;

  try {
    const response = await fetch(testEndpoint, {
      method: "POST",
      body: JSON.stringify({
        url: url,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    return await response.json();
  } catch (e) {
    if (e instanceof Error) throw e;
    return false;
  }
};
