document.addEventListener('DOMContentLoaded', () => {
    fetch('magnets.json?v=' + new Date().getTime())
      .then(response => response.json())
      .then(data => {
        window.magnetData = data; // Store data globally
        populateMagnetSelectorMaterial(data);
      })
      .catch(error => console.error('Error fetching magnet data:', error));
  });
  
  function populateMagnetSelectorMaterial(data) {
    const selector = document.getElementById('magnet-material-selector');
    const uniqueMaterials = new Set(); // Use a Set to store unique materials
  
    data.forEach(magnet => {
      uniqueMaterials.add(magnet.material); // Add each material to the Set
    });
  
    // Convert Set to an array and populate the selector
    Array.from(uniqueMaterials).forEach(material => {
      const option = document.createElement('option');
      option.value = material;
      option.textContent = material;
      selector.appendChild(option);
    });
  }
  
  function populateMagnetSelectorGrade(data, selectedMaterial) {
    const selector = document.getElementById('magnet-grade-selector');
    selector.innerHTML = '<option value="">Select Grade</option>'; // Clear existing options
  
    // Filter the data based on the selected material
    const filteredData = data.filter(magnet => magnet.material === selectedMaterial);
  
    // Populate the selector with the filtered grades
    filteredData.forEach(magnet => {
      const option = document.createElement('option');
      option.value = magnet.grade;
      option.textContent = magnet.grade;
      selector.appendChild(option);
    });
  }

  //change grade options after material change
  const materialSelector = document.getElementById('magnet-material-selector');
  materialSelector.addEventListener('change', () => {
    const selectedMaterial = materialSelector.value;
    populateMagnetSelectorGrade(magnetData, selectedMaterial);
  });
  
  function displayMagnetInfo() {
    const selectedGrade = document.getElementById('magnet-grade-selector').value;

    const shape = document.getElementById('magnet-shape-selector').value;

    const value1 = document.getElementById('shape-specific-value-1');
    const value2 = document.getElementById('shape-specific-value-2');
    const value3 = document.getElementById('shape-specific-value-3');

    if (!selectedGrade || !shape || !value1.value || !value2.value || (shape === 'block' && !value3.value)) {
        alert('Please fill in all required fields.');
        return;
    }

    const magnet = window.magnetData.find(m => m.grade === selectedGrade);
  
    const tbody = document.getElementById('magnet-info-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear the table body
  
    if (magnet) {
      const rows = [
        { characteristic: 'BH(max)',                              value: magnet.bh_max,                       unit: 'MGOe' },
        { characteristic: 'Residual Induction',                   value: magnet.residual_induction,           unit: 'T' },
        { characteristic: 'Coercive Force by Magnetic Induction', value: magnet.coercive_force_induction,     unit: 'kA/m' },
        { characteristic: 'Coercive Force by Magnetization',      value: magnet.coercive_force_magnetization, unit: 'kA/m' },
        { characteristic: 'Curie Temperature',                    value: magnet.curie_temperature,            unit: '°C' },
        { characteristic: 'Density',                              value: magnet.density,                      unit: 'g/cm³' },
        { characteristic: 'Mass',                                 value: calculateMass(magnet),               unit: 'g' }
      ];
  
      rows.forEach(row => {
        const tr = document.createElement('tr');
        const characteristicTd = document.createElement('td');
        const valueTd = document.createElement('td');
        const unitTd = document.createElement('td');
  
        characteristicTd.textContent = row.characteristic;
        valueTd.textContent = row.value;
        unitTd.textContent = row.unit;
  
        tr.appendChild(characteristicTd);
        tr.appendChild(valueTd);
        tr.appendChild(unitTd);
        tbody.appendChild(tr);
      });
    }
  }

  function calculateVolume(magnet) {
    const shape = document.getElementById('magnet-shape-selector').value;
    const value1 = parseFloat(document.getElementById('shape-specific-value-1').value);
    const value2 = parseFloat(document.getElementById('shape-specific-value-2').value);
    const value3 = parseFloat(document.getElementById('shape-specific-value-3').value);

    let volume = 0;
    if (shape === 'block') {
      // Convert millimeter values to centimeters if needed
      const length = value1 / 10; // Convert mm to cm
      const width = value2 / 10; // Convert mm to cm
      const height = value3 / 10; // Convert mm to cm

      // Volume = length * width * height
      volume = length * width * height;
    } else if (shape === 'disk') {
      // Convert millimeter values to centimeters if needed
      const diameter = value1 / 10; // Convert mm to cm
      const height = value2 / 10; // Convert mm to cm

      // Volume = π * (diameter/2)^2 * height
      const radius = diameter / 2; // Assuming length as diameter for disk
      volume = Math.PI * Math.pow(radius, 2) * height;
    } else if (shape === 'ring') {
      const height = value3 / 10; // Convert mm to cm

      const diameterExt = value1 / 10;
      const radiusExt = diameterExt / 2;
      let volumeExt = Math.PI * Math.pow(radiusExt, 2) * height;

      const diameterInt = value2 / 10;
      const radiusInt = diameterInt / 2;
      let volumeInt = Math.PI * Math.pow(radiusInt, 2) * height;

      volume = volumeExt - volumeInt;
  }

    return volume.toFixed(2); // Return volume with 2 decimal places
}

function calculateMass(magnet) {
    const volume = calculateVolume(magnet);
    return (volume * magnet.density).toFixed(2); // Return mass with 2 decimal places
}


  
  /* Shape Specific Fields */
function toggleShapeFields() {
  const shapeSelector = document.getElementById('magnet-shape-selector');
  const shapeSpecificLabel1 = document.getElementById('shape-specific-label-1');
  const shapeSpecificLabel2 = document.getElementById('shape-specific-label-2');
  const shapeSpecificLabel3 = document.getElementById('shape-specific-label-3');

  const shapeSpecificValue1 = document.getElementById('shape-specific-value-1');
  const shapeSpecificValue2 = document.getElementById('shape-specific-value-2');
  const shapeSpecificValue3 = document.getElementById('shape-specific-value-3');

  const selectedShape = shapeSelector.value;
  if (selectedShape === 'block') {
      shapeSpecificLabel1.textContent = 'Length (MM):';
      shapeSpecificLabel2.textContent = 'Width (MM):';
      shapeSpecificLabel3.textContent = 'Height (MM):';

      shapeSpecificValue1.style.display = 'block';
      shapeSpecificValue2.style.display = 'block';
      shapeSpecificValue3.style.display = 'block';

      shapeSpecificValue1.required = true;
      shapeSpecificValue2.required = true;
      shapeSpecificValue3.required = true;
  } else if (selectedShape === 'disk') {
      shapeSpecificLabel1.textContent = 'Diameter (MM):';
      shapeSpecificLabel2.textContent = 'Height (MM):';
      shapeSpecificLabel3.textContent = '';

      shapeSpecificValue1.style.display = 'block';
      shapeSpecificValue2.style.display = 'block';
      shapeSpecificValue3.style.display = 'none';

      shapeSpecificValue1.required = true;
      shapeSpecificValue2.required = true;
      shapeSpecificValue3.required = false;
  } else if (selectedShape === 'ring') {
    shapeSpecificLabel1.textContent = 'Diameter Ext.(MM):';
    shapeSpecificLabel2.textContent = 'Diameter Int.(MM):';
    shapeSpecificLabel3.textContent = 'Height (MM):';

    shapeSpecificValue1.style.display = 'block';
    shapeSpecificValue2.style.display = 'block';
    shapeSpecificValue3.style.display = 'block';

    shapeSpecificValue1.required = true;
    shapeSpecificValue2.required = true;
    shapeSpecificValue3.required = true;
}
}
  