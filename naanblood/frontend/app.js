const apiUrl = "http://127.0.0.1:5000"; // Replace with your Flask API URL if hosted on AWS

// Register a Donor
document.getElementById("donor-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("donor-name").value;
  const bloodGroup = document.getElementById("donor-blood-group").value;

  const response = await fetch(`${apiUrl}/register-donor`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, blood_group: bloodGroup }),
  });
  const data = await response.json();
  alert(data.message);
});

// Request Blood
document
  .getElementById("blood-request-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("request-name").value;
    const bloodGroup = document.getElementById("request-blood-group").value;

    const response = await fetch(`${apiUrl}/request-blood`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, blood_group: bloodGroup }),
    });
    const data = await response.json();
    alert(data.message);
  });

// Search Donors
document.getElementById("search-btn").addEventListener("click", async () => {
  const bloodGroup = document.getElementById("search-blood-group").value;

  const response = await fetch(
    `${apiUrl}/search-donors?blood_group=${bloodGroup}`
  );
  const data = await response.json();
  const donorsList = document.getElementById("donors-list");
  donorsList.innerHTML = "";
  data.matching_donors.forEach((donor) => {
    const li = document.createElement("li");
    li.textContent = `${donor.name} (${donor.blood_group})`;
    donorsList.appendChild(li);
  });
});
