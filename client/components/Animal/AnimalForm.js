import ListErrors from '../ListErrors';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state.animalForm
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: 'ANIMALFORM_LOADED', payload }),
  onSubmit: payload =>
    dispatch({ type: 'ANIMALFORM_SUBMITTED', payload }),
  onUnload: payload =>
    dispatch({ type: 'ANIMALFORM_UNLOADED', payload }),
  onUpdateField: (key, value) =>
    dispatch({ type: 'UPDATE_FIELD_ANIMALFORM', key, value })
});

class AnimalForm extends React.Component {
  constructor(){
    super();

    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.value);
      this.changeName = updateFieldEvent('name');
      this.changeType = updateFieldEvent('type');
      this.changeBreed = updateFieldEvent('breed');
      this.changeWeight = updateFieldEvent('weight');
      this.changeAge = updateFieldEvent('age');
      this.changeBloodType = updateFieldEvent('bloodType');
      this.changeContactName = updateFieldEvent('contactName');
      this.changeContactNumber = updateFieldEvent('ContactNumber');
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
        vetName: this.props.vetName,
        location: this.props.location
      };

      const slug = { slug: this.props.animalSlug };
      const promise = this.props.animalSlug ?
        agent.Animals.update(Object.assign(animal, slug)) :
        agent.Animals.create(animal);

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

              <ListErrors errors={this.props.errors}></ListErrors>

              <form>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      placeholder="Animal Name"
                      value={this.props.name}
                      onChange={this.changeName} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      placeholder="Animal Type"
                      value={this.props.type}
                      onChange={this.changeType} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      placeholder="Animal Breed"
                      value={this.props.breed}
                      onChange={this.changeBreed} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      placeholder="Animal Weight"
                      value={this.props.weight}
                      onChange={this.changeWeight} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      placeholder="Animal Age"
                      value={this.props.age}
                      onChange={this.changeAge} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      placeholder="Animal Blood Type"
                      value={this.props.bloodType}
                      onChange={this.changeBloodType} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      placeholder="Animal Contact Name"
                      value={this.props.contactName}
                      onChange={this.changeContactName} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      placeholder="Animal Vetinarian Name"
                      value={this.props.vetName}
                      onChange={this.changeVetName} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      placeholder="Animal Location"
                      value={this.props.location}
                      onChange={this.changeLocation} />
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}>
                    Create Animal
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
