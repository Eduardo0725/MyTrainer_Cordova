class MyTrainerServer extends Api {
    url = 'https://us-central1-mytrainer-85006.cloudfunctions.net/';

    async createUser(file) {
        return await this.post(file, 'create_user');
    };

    async validate(collection, email, password) {
        return await this.post({
            collection: collection,
            email: email,
            password: password
        }, 'validate_user');
    };

    async searchPersonals() {
        let format = (new FormattingDate()).dateFormat();
        return await this.post({ lastSeen: format }, 'fetch_personal_trainers');
    };

    async sendLastSeen(id, collection, coords = false) {
        let format = (new FormattingDate()).dateFormat();

        return await this.put({
            id: id,
            lastSeen: format,
            collection: collection,
            coords
        }, 'user_last_seen');
    }

    async getData(id, collection) {
        return await this.post({
            id,
            collection
        },
            'get_data');
    }

    async sendTraining(idClient, idPersonal, body) {
        let format = (new FormattingDate()).dateFormat();
        return this.post({
            idClient,
            idPersonal,
            body,
            sendDate: format
        }, 'create_training');
    };

    async geocoding(place){
        place = (typeof place !== "string") ? place.join(',') : place;
        return this.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1IjoiZWR1YXJkb2FjNyIsImEiOiJjazNwNXRqYmMyOGw4M21vM3BmdHl3Z3NzIn0.XAq35G0W92TM-gHFt3W_Bg`,
            ''
        );
    }

    async trainingConfirmation(idTraining, idClient, idPersonal, confirmation){
        return this.post({
            idTraining,
            idClient,
            idPersonal,
            confirmation
        }, 'training_confirmation');
    }
}