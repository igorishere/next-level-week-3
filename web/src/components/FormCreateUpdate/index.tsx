import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

import InputMask from "react-input-mask";

import { Map, Marker, TileLayer } from 'react-leaflet';




import mapIcon from '../../utils/mapIcon';

import {
  PageCreateOrphanage,
  CreateOrphanageForm,
  InputBlock,
  Label,
  ButtonsSelect,
  ButtonForm,
  ImagesContainer,
  NewImageLabel,
  Footer,
  Button,
  Text,
  ImagesMarkers,
  ButtonMarkerSelect
} from './styles';
import SideBar from '../../components/SideBar';
import { FiCheck, FiPlus, FiXCircle } from 'react-icons/fi';
import SwitchTheme from '../../components/SwitchTheme';
import useTheme from '../../utils/useTheme';
import { LeafletMouseEvent } from 'leaflet';

import MarkerYellow from '../../assets/images/Marker-yellow.svg';
import MarkerRed from '../../assets/images/Marker-red.svg';
import MarkerGreen from '../../assets/images/Marker-green.svg';
import MarkerBlue from '../../assets/images/Marker-blue.svg';
import MarkerBlack from '../../assets/images/Marker-black.svg';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
interface PropsCreateOrphanage{

  name: string;
  setName: Dispatch<SetStateAction<string>>;
  about: string;
  setAbout: Dispatch<SetStateAction<string>>;
  instructions: string;
  setInstructions: Dispatch<SetStateAction<string>>;
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
  opening_hours: string;
  setOpeningHours: Dispatch<SetStateAction<string>>;
  open_on_weekends: boolean;
  setOpenOnWeekends: Dispatch<SetStateAction<boolean>>;
  position: {
     latitude: number; longitude: number;
  };
  setPosition: Dispatch<SetStateAction<{ latitude: number; longitude: number; }>>;
  previewImages:string[];
  location: {
    latitude: number;
    longitude: number;
  };

  markerMap?:string;
  handleSelectColorMarker: (color: string) => void;

  handleMapClick: (event: LeafletMouseEvent) => void;
  handleSelectImage: (event: ChangeEvent<HTMLInputElement>) => void;
  handleForm:(event: FormEvent) => void;
  page?: string;
  



};

export default function CreateOrphanage({
  
  name,
  setName,
  about,
  setAbout,
  instructions,
  setInstructions,
  phone,
  setPhone,
  opening_hours,
  setOpenOnWeekends,
  open_on_weekends,
  setOpeningHours,
  position,
  setPosition,
  previewImages,
  location,
  markerMap,
  handleMapClick,
  handleSelectColorMarker,
  handleSelectImage,
  handleForm,
  page = 'default'
  
}: PropsCreateOrphanage) {



  const {themeValues } = useTheme();

  const history = useHistory()


  const handleConfirmEditOrphanage = () => {


      history.push('/restrict/dashboard/orphanages');



      toast.success(`🖌 Orfanato ${name}, editado com sucesso!`,{ 
          position: toast.POSITION.BOTTOM_RIGHT

        });

  }


  return (

  <>
      <PageCreateOrphanage>

        <SwitchTheme/>
        <SideBar />

        <main>
          {
            page !== 'default' &&(

              <Text> Editar perfil de {name} </Text>

            )
          }
          <CreateOrphanageForm onSubmit={handleForm}>
          
            <fieldset>
              <legend>Dados</legend>

              <Map
                center={

                  page === 'default ' ? (

                        [
                          position.latitude,
                          position.longitude
                        ]
                      )
                      :

                      (
                        [
                          location.latitude,
                          location.longitude
                        ]

                      )

                }
                style={{ width: '100%', height: 280 }}
                zoom={15}
                onClick={handleMapClick}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/${themeValues.name}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
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
              <label>Selecione a cor do seu marcador</label>

              <ImagesMarkers>
                <ButtonMarkerSelect
                type='button' 
                active={markerMap === '#FF6666'}
                onClick={() => handleSelectColorMarker('#FF6666')}
                >

                <img src={MarkerRed} alt="" />
                </ButtonMarkerSelect>
                <ButtonMarkerSelect
                type='button' 
                active={markerMap === '#68DF7B'}
                onClick={() => handleSelectColorMarker('#68DF7B')}
                >

                  
                <img src={MarkerGreen} alt="" />
                </ButtonMarkerSelect>
                <ButtonMarkerSelect
                type='button' 
                active={markerMap === '#FFD666'}
                onClick={() => handleSelectColorMarker('#FFD666')}
                >


                <img src={MarkerYellow} alt="" />
                </ButtonMarkerSelect>
                <ButtonMarkerSelect
                type='button' 
                active={markerMap === '#434343'}
                onClick={() => handleSelectColorMarker('#434343')}
                >


                <img src={MarkerBlack} alt="" />
                </ButtonMarkerSelect>
                <ButtonMarkerSelect
                type='button' 
                active={markerMap === '#15D3D6'}
                onClick={() => handleSelectColorMarker('#15D3D6')}
                >


                <img src={MarkerBlue} alt="" />
                </ButtonMarkerSelect>
                

                
              </ImagesMarkers>
              </InputBlock>
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
                  id="about"
                  maxLength={300}
                  value={about}
                  onChange={event => setAbout(event.target.value)}
                />
              </InputBlock>

              <InputBlock>
                <Label htmlFor="phone">Número para contato</Label>
                <InputMask
                mask='(99) 9 9999-9999'
                  id="phone"
                  value={phone}
                  onChange={event => setPhone(event.target.value)}
              />
              </InputBlock>



              <InputBlock>


                <Label htmlFor="images">Fotos</Label>

                <ImagesContainer>

                  {previewImages.map((image, index) => (
                    
                  
                    <img key={index} src={image} alt="" />
             
                   
                  ))}
                   

                  <NewImageLabel htmlFor='image[]'>
                    <FiPlus size={24} color={themeValues.colors.secondarycontentButton} />
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
          {
            page === 'createOrphanage' && (

            <Button 
            typeStyle="confirm" 
            type="submit"
            >
              Confirmar
            </Button>

            )
          }
          {
            page === 'dashboard:pending' && (

            <Button 
            typeStyle="confirm" 
            type="submit"
            onClick={handleConfirmEditOrphanage}
            >
              Confirmar
            </Button>

            )
          }
          {
            page === 'dashboard:edit' && (
              <>
              <Button 
              typeStyle="confirm" 
              type="submit"
              >
                Confirmar
              </Button>

             </>

            )
          }

          {
            page === 'newOrphanage' &&
            (
              <Footer>
                <ButtonForm type='button' color='red'>
                  <FiXCircle size={24} color='#FFF'/>
                  <p>Recusar</p>

                </ButtonForm>


                <ButtonForm type='submit' color='green'>
                  <FiCheck size={24} color='#FFF'/>
                  <p>Aceitar</p>
                </ButtonForm>
              </Footer>
            )
          }
          </CreateOrphanageForm>
        </main>
      </PageCreateOrphanage>
    </>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
