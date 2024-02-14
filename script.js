const form = document.querySelector("form");
const passwordInput = document.getElementById("password");
const popup = document.getElementById("popup");

const showError = (field, errorText) => {

    field.classList.add("error");
    const errorElement = document.createElement("small");
    errorElement.classList.add("error-text");
    errorElement.innerText = errorText;
    field.closest(".form-group").appendChild(errorElement);

}

const showPopup = () => {

    popup.classList.add("open-slide");

}

const closeSlide = () => {

    popup.classList.remove("open-slide");
    form.reset();

}

const handleFormData = async(e) => {
    e.preventDefault();
   
    const fullnameInput = document.getElementById("fullname");
    const staffIdInput = document.getElementById("staffId");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
   
    const fullname = fullnameInput.value.trim();
    const staffId = staffIdInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const phone = phoneInput.value.trim();
  
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  
    document.querySelectorAll(".form-group .error").forEach(field => field.classList.remove("error"));
    document.querySelectorAll(".error-text").forEach(errorText => errorText.remove());
  
    if (fullname === "") {

        showError(fullnameInput, "Enter your full name*");

    }

    if (staffId === "") {

        showError(staffIdInput, "Enter your staff ID*");

    }

    if (!emailPattern.test(email)) {

        showError(emailInput, "Enter a valid email address*");

    }

    if (password === "") {

        showError(passwordInput, "Enter your password*");

    }

    if (phone === ""){

        showError(phoneInput, "Enter your phone number*");

    }
   
    const errorInputs = document.querySelectorAll(".form-group .error");

    if (errorInputs.length === 0) {        
            try{
                const response = await fetch("", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",      
                    },
                    body: JSON.stringify({
                        username: fullname,
                        staff_id: staffId,
                        email,
                        password,
                        ph_numer: phone,
                    }),
                });

                if (response.ok){
                    console.log(response);
                }

                else {
                    throw new Error("Failed to submit the form");
                }

            } catch (error){
                console.error("Error:", error.message);
            }
        showPopup();
    }
}

form.addEventListener("submit", handleFormData);



// async function getIpAddressAndUserAgent() {
//     try {
//         const response = await fetch('https://api.ipify.org?format=json');
//         const data = await response.json();
//         const user_ip = data.ip;
//         const user_agent = navigator.userAgent;

//         return {user_ip, user_agent};
//     } catch (error) {
//         console.error('Error fetching IP address and user agent:', error);
//         return {user_ip:'Error', user_agent:'Error'};
//     }
// }

// async function getUserAgent(){
    
//     const user_agent = navigator.userAgent;
//     return user_agent;

// }

const getUserIP = async () => {
    try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Error getting IP address:", error.message);
        return null;
    }
};

const getUserAgent = () => {
    return navigator.userAgent;
};

function getUserLocation() {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(`Error getting location: ${error.message}`);
          }
        );
      } else {
        reject('Geolocation is not supported by your browser');
      }
    });
  }
  
  function handleUserLocation() {
    getUserLocation()
      .then((location) => {
        console.log(`User's location: Latitude ${location.latitude}, Longitude ${location.longitude}`);
    
      })
      .catch((error) => {
        console.error(error);
  
        if (error.includes('Geolocation permission has been blocked')) {
          alert('Geolocation permission has been blocked. Please reset it in the Page Info section.');
        }
  
      });
  }
  
  document.addEventListener("DOMContentLoaded", async() => {
    handleUserLocation();
    const userIP = await getUserIP();
    const userAgent = getUserAgent();

    console.log("User's IP Address:", userIP);
    console.log("User Agent:", userAgent);

    

  });

// --------------------------------------------------------------------------------
// const getLocalIP = () => {
//     return new Promise((resolve, reject) => {
//       const rtcPeerConnection = new RTCPeerConnection({ iceServers: [] });
  
//       rtcPeerConnection.createDataChannel('');
  
//       rtcPeerConnection.createOffer()
//         .then((offer) => rtcPeerConnection.setLocalDescription(offer))
//         .catch(reject);
  
//       rtcPeerConnection.onicecandidate = (event) => {
//         if (event.candidate) {
//           const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
//           const ipAddressMatch = ipRegex.exec(event.candidate.candidate);
  
//           if (ipAddressMatch && ipAddressMatch[1]) {
//             const ipAddress = ipAddressMatch[1];
//             resolve(ipAddress);
//             rtcPeerConnection.onicecandidate = null; // Clean up event listener
//           }
//         }
//       };
//     });
//   };  
  // Example usage
//   getLocalIP().then((ipAddress) => {
//     console.log('User Local IP Address:', ipAddress);
//   });
// ------------------------------------------------------------  

// document.addEventListener("DOMContentLoaded", async () => {
//     const userIP = await getUserIP();
//     const userAgent = getUserAgent();
//     getLocalIP().then((ipAddress) => {
//         console.log('User Local IP Address:', ipAddress);
//     });
//     getUserLocation()
//     .then((location) => {
//       console.log('User Location:', location);
      
//     })
//     .catch((error) => {
//       console.error(error);

//       if (error.includes('Geolocation permission has been blocked')) {
//         alert('Geolocation permission has been blocked. Please reset it in the Page Info section.');
//       }

//     });
//     console.log("User's IP Address:", userIP);
//     console.log("User Agent:", userAgent);

// });

// function getUserLocation() {
//     return new Promise((resolve, reject) => {
//       if ("geolocation" in navigator) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const latitude = position.coords.latitude;
//             const longitude = position.coords.longitude;
//             resolve({ latitude, longitude });
//           },
//           (error) => {
//             reject(`Error getting location: ${error.message}`);
//           }
//         );
//       } else {
//         reject('Geolocation is not supported by your browser');
//       }
//     });
//   }
  
//   getUserLocation()
//     .then((location) => {
//       console.log('User Location:', location);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
  

// async function sendUserInfo(user_agent) {
//     try {
//         const response = await fetch('', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
         
//                 user_agent,
//             }),
//         });

//         if (response.ok) {
//             console.log('User information sent to server successfully');
//         } else {
//             throw new Error('Failed to send user information to server');
//         }
//     } catch (error) {
//         console.error('Error sending user information:', error.message);
//     }
// }

// document.addEventListener('DOMContentLoaded', async () => {
//     try {

//         const user_agent = navigator.userAgent;
//         console.log('User info:', user_agent);
        
        
        

//         const ipAddress = await getIpAddress();
//         console.log('User IP Address:', ipAddress);
// return user_agent;
//         await sendUserInfo(user_agent);
//     } catch (error) {
//         console.error('Error:', error.message);
//     }
// });

// // const getUserIP = async () => {
// //     try {
// //       const response = await fetch('https://ipinfo.io/json');
// //       if (response.ok) {
// //         const data = await response.json();
// //         return data.ip;
// //       } else {
// //         throw new Error('Failed to get IP address');
// //       }
// //     } catch (error) {
// //       console.error('Error:', error.message);
// //       return null;
// //     }
// //   };

// // document.addEventListener('DOMContentLoaded', async () => {
// //     const userIP = await getUserIP();
// //     console.log('User IP:', userIP);
  
    
// // });

// if ("geolocation" in navigator) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;
  
//       console.log(`User's location: Latitude ${latitude}, Longitude ${longitude}`);
//     }, (error) => {
//       console.error('Error getting location:', error.message);
//     });
//   } else {
//     console.error('Geolocation is not supported by your browser');
//   }
  
