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
    const magnet = window.magnetData.find(m => m.grade === selectedGrade);
  
    const tbody = document.getElementById('magnet-info-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear the table body
  
    if (magnet) {
      const rows = [
        { characteristic: 'Magnet Grade',                         value: magnet.grade,                        unit: '' },
        { characteristic: 'BH(max)',                              value: magnet.bh_max,                       unit: 'MGOe' },
        { characteristic: 'Residual Induction',                   value: magnet.residual_induction,           unit: 'T' },
        { characteristic: 'Coercive Force by Magnetic Induction', value: magnet.coercive_force_induction,     unit: 'kA/m' },
        { characteristic: 'Coercive Force by Magnetization',      value: magnet.coercive_force_magnetization, unit: 'kA/m' },
        { characteristic: 'Curie Temperature',                    value: magnet.curie_temperature,            unit: '°C' },
        { characteristic: 'Density',                              value: magnet.density,                      unit: 'g/cm³' }
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
  
  /* Shape Stuff */
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
        shapeSpecificLabel1.textContent = 'Height:';
        shapeSpecificLabel2.textContent = 'Length:';
        shapeSpecificLabel3.textContent = 'Width:';
  
        shapeSpecificValue1.style.display = 'block'; 
        shapeSpecificValue2.style.display = 'block'; 
        shapeSpecificValue3.style.display = 'block'; 
  
    } else if (selectedShape === 'disk') {
        shapeSpecificLabel1.textContent = 'Height:';
        shapeSpecificLabel2.textContent = 'Diameter:';
        shapeSpecificLabel3.textContent = '';
  
        shapeSpecificValue1.style.display = 'block'; 
        shapeSpecificValue2.style.display = 'block'; 
        shapeSpecificValue3.style.display = 'none';
    } else {
    }
  }
  