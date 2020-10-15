import React, { useState, FormEvent, ChangeEvent } from "react";

import { useHistory } from 'react-router-dom';
import { Map, Marker, TileLayer } from 'react-leaflet';


import { LeafletMouseEvent } from 'leaflet';


import mapIcon from '../../utils/mapIcon';

import {
  PageCreateOrphanage,
  CreateOrphanageForm,
  InputBlock,
  Label,
  ButtonsSelect,
  Button,
  ImagesContainer,
  NewImageLabel
} from './styles';
import SideBar from '../../components/SideBar';
import { FiPlus } from 'react-icons/fi';
import api from '../../services/api';



export default function CreateOrphanage() {

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setpreviewImages] = useState<string[]>([]);


  const history = useHistory();

  const handleMapClick = (event: LeafletMouseEvent) => {
    console.log(event.latlng);

    const { lat, lng } = event.latlng

    setPosition({
      latitude: lat,
      longitude: lng
    });
  };

  const handleSelectImage = (event: ChangeEvent<HTMLInputElement>) => {

    console.log(event.target.files);


    if (!event.target.files) return;

    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);



    const selectImagesPreview = selectedImages.map(image => {

      return URL.createObjectURL(image);
    });

    setpreviewImages(selectImagesPreview);
  };


  const handleForm = async (event: FormEvent) => {

    event.preventDefault();



    const { latitude, longitude } = position;


    



  const data = new FormData();

  data.append('name', name);
  data.append('about', about);
  data.append('instructions', instructions);
  data.append('latitude', String(latitude));
  data.append('longitude', String(longitude));
  data.append('opening_hours', opening_hours);
  data.append('open_on_weekends', String(open_on_weekends));


  images.forEach(image => {

    data.append('images', image);

  });

  await api.post('/orphanages', data);


  alert('Cadastro realizado com sucesso!');

  history.push('/app');

};

return (
  <PageCreateOrphanage>
    <SideBar />

    <main>
      <CreateOrphanageForm onSubmit={handleForm}>
        <fieldset>
          <legend>Dados</legend>

          <Map
            center={[-27.2092052, -49.6401092]}
            style={{ width: '100%', height: 280 }}
            zoom={15}
            onClick={handleMapClick}
          >
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            />

            {position.latitude !== 0 && (

              <Marker
                interactive={false}
                icon={mapIcon}
                position={[
                  position.latitude,
                  position.longitude
                ]}
              />

            )


            }
          </Map>



          <InputBlock>
            <Label htmlFor="name">Nome</Label>
            <input
              id="name"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </InputBlock>



          <InputBlock >
            <Label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></Label>
            <textarea
              id="name"
              maxLength={300}
              value={about}
              onChange={event => setAbout(event.target.value)}
            />
          </InputBlock>



          <InputBlock>


            <Label htmlFor="images">Fotos</Label>

            <ImagesContainer>

              {previewImages.map(image => (
                <img key={image} src={image} alt="" />
              ))}

              <NewImageLabel htmlFor='image[]'>
                <FiPlus size={24} color="#15b6d6" />
              </NewImageLabel>

              <input multiple type="file" onChange={handleSelectImage} id="image[]" />

            </ImagesContainer>



          </InputBlock>




        </fieldset>

        <fieldset>
          <legend>Visitação</legend>

          <InputBlock>
            <Label htmlFor="instructions">Instruções</Label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={event => setInstructions(event.target.value)}
            />
          </InputBlock>


          <InputBlock>

            <Label htmlFor="opening_hours">Horário de funcionamento</Label>
            <input
              id="opening_hours"
              value={opening_hours}
              onChange={event => setOpeningHours(event.target.value)}
            />

          </InputBlock>


          <InputBlock>
            <Label htmlFor="open_on_weekends">Atende fim de semana</Label>

            <ButtonsSelect>
              <Button
                type="button"
                typeStyle='select'
                active={open_on_weekends ? true : false}
                onClick={() => setOpenOnWeekends(true)}
              >
                Sim
                </Button>


              <Button
                type="button"
                typeStyle='select'
                active={!open_on_weekends ? true : false}
                onClick={() => setOpenOnWeekends(false)}
              >
                Não
                </Button>
            </ButtonsSelect>
          </InputBlock>
        </fieldset>

        <Button typeStyle="confirm" type="submit">
          Confirmar
          </Button>
      </CreateOrphanageForm>
    </main>
  </PageCreateOrphanage>
);
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
