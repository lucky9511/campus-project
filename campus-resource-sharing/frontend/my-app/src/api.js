const BASE_URL = "https://campus-project-5.onrender.com";

export const sendVerification = async (email) => {
  const res = await fetch(`${BASE_URL}/send-verification`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });

  return res.json();
};

export const verifyOtp = async (email, otp) => {
  const res = await fetch(`${BASE_URL}/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, otp })
  });

  return res.json();
};
