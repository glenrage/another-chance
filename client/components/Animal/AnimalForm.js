import ListErrors from '../ListErrors';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state.animalForm
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: 'ANIMALFORM_LOADED', payload }),
  onSubmit: payload => dispatch({ type: 'ANIMALFORM_SUBMITTED', payload }),
  onUnload: payload => dispatch({ type: 'ANIMALFORM_UNLOADED', payload }),
  onUpdateField: (key, value) =>
    dispatch({ type: 'UPDATE_FIELD_ANIMALFORM', key, value })
});

class AnimalForm extends React.Component {
  constructor() {
    super();

    const updateFieldEvent = key => ev =>
      this.props.onUpdateField(key, ev.target.value);
    this.changeName = updateFieldEvent('name');
    this.changeType = updateFieldEvent('type');
    this.changeBreed = updateFieldEvent('breed');
    this.changeWeight = updateFieldEvent('weight');
    this.changeAge = updateFieldEvent('age');
    this.changeBloodType = updateFieldEvent('bloodType');
    this.changeContactName = updateFieldEvent('contactName');
    this.changeContactNumber = updateFieldEvent('contactNumber');
    this.changeContactEmail = updateFieldEvent('contactEmail');
    this.changeVetName = updateFieldEvent('vetName');
    this.changeLocation = updateFieldEvent('location');

    this.submitForm = ev => {
      ev.preventDefault();
      const animal = {
        name: this.props.name,
        type: this.props.type,
        breed: this.props.breed,
        weight: this.props.weight,
        age: this.props.age,
        bloodType: this.props.bloodType,
        contactName: this.props.contactName,
        contactNumber: this.props.contactNumber,
        contactEmail: this.props.contactEmail,
        vetName: this.props.vetName,
        location: this.props.location
      };
      console.log(animal);
      const slug = { slug: this.props.animalSlug };
      const promise = this.props.animalSlug
        ? agent.Animals.update(Object.assign(animal, slug))
        : agent.Animals.create(animal);

      this.props.onSubmit(promise);
    };
  }

  /**
 * React-router has an interesting quirk: if two routes have the
 * same component, react-router will reuse the component when
 * switching between the two. So if '/editor' and '/editor/slug'
 * both use the 'Editor' component, react-router won't recreate
 * the Editor component if you navigate to '/editor' from '/editor/slug'.
 * To work around this, we need the `componentWillReceiveProps()` hook.
 */
  componentWillReceiveProps(nextProps) {
    if (this.props.params.slug !== nextProps.params.slug) {
      if (nextProps.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(agent.Animals.get(this.props.params.slug));
      }
      this.props.onLoad(null);
    }
  }

  componentWillMount() {
    if (this.props.params.slug) {
      return this.props.onLoad(agent.Animals.get(this.props.params.slug));
    }
    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="animal-form-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <h1> Nuevo Animal </h1>
              <hr />
              <ListErrors errors={this.props.errors} />

              <h3>Información del Animal</h3>
              <form>
                <fieldset>
                  <b>Nombre</b>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      placeholder="Nombre"
                      value={this.props.name}
                      onChange={this.changeName}
                    />
                  </fieldset>
                  <b>Tipo</b> <i>Gato o perro</i>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      placeholder="Tipo"
                      value={this.props.type}
                      onChange={this.changeType}
                    />
                  </fieldset>
                  <b>Raza</b>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      placeholder="Raza"
                      value={this.props.breed}
                      onChange={this.changeBreed}
                    />
                  </fieldset>
                  <b>Edad</b> <i>Usar años</i>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      placeholder="Edad"
                      value={this.props.age}
                      onChange={this.changeAge}
                    />
                  </fieldset>
                  <b>Peso</b> <i>Usar Libras</i>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      placeholder="Peso"
                      value={this.props.weight}
                      onChange={this.changeWeight}
                    />
                  </fieldset>
                  <b>Tipo de Sangre</b>{' '}
                  <i>Escribir “desconocido” si no lo sabe</i>
                  <fieldset className="form-group">
                    <select
                      className="form-control"
                      name="bloodType"
                      onChange={this.changeBloodType}
                    >
                      <option value="Desconocido">Desconocido</option>
                      <option value="DEA 1.1">DEA 1.1</option>
                      <option value="DEA 1.2">DEA 1.2</option>
                      <option value="DEA 3">DEA 3</option>
                      <option value="DEA 4">DEA 4</option>
                      <option value="DEA 5">DEA 5</option>
                      <option value="DEA 6">DEA 6</option>
                      <option value="DEA 7">DEA 7</option>
                      <option value="DEA 8">DEA 8</option>
                      <option value="Dal">Dal</option>
                      <option value="Kai-1">Kai-1</option>
                      <option value="Kai-2">Kai-2</option>
                      <option value="A">A (Gato)</option>
                      <option value="B">B (Gato)</option>
                      <option value="AB">AB (Gato)</option>
                    </select>
                  </fieldset>
                  <h3>Información de Contacto</h3>
                  <b>Nombre del contacto</b> <i>Apellidos, Nombre</i>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      placeholder="Nombre completo"
                      value={this.props.contactName}
                      onChange={this.changeContactName}
                    />
                  </fieldset>
                  <b>Teléfono</b> <i>(111)-111-1111</i>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-md"
                      type="tel"
                      placeholder="Teléfono"
                      value={this.props.contactNumber}
                      onChange={this.changeContactNumber}
                    />
                  </fieldset>
                  <b>Email</b>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      placeholder="Email"
                      value={this.props.contactEmail}
                      onChange={this.changeContactEmail}
                    />
                  </fieldset>
                  <b>Nombre del Veterinario</b>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      placeholder="Nombre del Veterinario"
                      value={this.props.vetName}
                      onChange={this.changeVetName}
                    />
                  </fieldset>
                  <b>Pueblo o ciudad</b>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      placeholder="Pueblo o ciudad"
                      value={this.props.location}
                      onChange={this.changeLocation}
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}
                  >
                    Enviar
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimalForm);
