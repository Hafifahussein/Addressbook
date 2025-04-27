function Place(location, landmarks, timeOfYear, notes) {
    this.location = location;
    this.landmarks = landmarks ? landmarks.split(',').map(item => item.trim()) : [];
    this.timeOfYear = timeOfYear || 'Not specified';
    this.notes = notes || '';
    this.visitedAt = new Date();
}

function PlacesTracker() {
    this.places = [];
}

PlacesTracker.prototype = {
    addPlace: function(place) {
        if (!(place instanceof Place)) {
            throw new Error("Can only add Place objects");
        }
        this.places.push(place);
        this.saveToLocalStorage();
        return this.places.length;
    },
    
    deletePlace: function(index) {
        if (index < 0 || index >= this.places.length) {
            throw new Error("Invalid index");
        }
        const deleted = this.places.splice(index, 1)[0];
        this.saveToLocalStorage();
        return deleted;
    },
    
    searchPlaces: function(term) {
        const lowerTerm = term.toLowerCase();
        return this.places.filter(place => 
            place.location.toLowerCase().includes(lowerTerm) ||
            place.landmarks.some(landmark => landmark.toLowerCase().includes(lowerTerm)) ||
            place.timeOfYear.toLowerCase().includes(lowerTerm) ||
            place.notes.toLowerCase().includes(lowerTerm)
        );
    },
    
    saveToLocalStorage: function() {
        localStorage.setItem('placesTracker', JSON.stringify(this.places));
    },
    
    loadFromLocalStorage: function() {
        const stored = localStorage.getItem('placesTracker');
        if (stored) {
            const parsed = JSON.parse(stored);
            this.places = parsed.map(placeData => {
                const place = new Place(
                    placeData.location,
                    placeData.landmarks.join(', '),
                    placeData.timeOfYear,
                    placeData.notes
                );
                place.visitedAt = new Date(placeData.visitedAt);
                return place;
            });
        }
    }
};