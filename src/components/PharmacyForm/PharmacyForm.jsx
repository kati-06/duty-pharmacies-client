import Select from 'react-select';
import './PharmacyForm.style.css';

function PharmacyForm({
  cityOptions,
  countyOptions,
  handleSubmit,
  handleChangeCity,
  handleChangeCounty,
  selectedCity,
  selectedCounty,
  disabled,
}) {
  const currentDate = new Date();
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  const dateToday = currentDate.toLocaleDateString('tr-TR', options);

  const tomorrow = new Date();
  tomorrow.setDate(currentDate.getDate() + 1);
  const dateTomorrow = tomorrow.toLocaleDateString('tr-TR', options);

  return (
    <div className="border-x bg-stone-200 pt-3">
      <header
        className="px-3 text-center "
        style={{overflowWrap: 'break-word'}}
      >
        <p>
          <strong>{dateToday}</strong> akşamından{' '}
          <strong>{dateTomorrow}</strong> sabahına kadar
        </p>
      </header>
      <div className="grid grid-cols-5 gap-5 px-3 py-5 ">
        <div className="col-span-2">
          <Select
            options={cityOptions}
            placeholder={'İl seç'}
            onChange={handleChangeCity}
            value={cityOptions.find((option) => option.value === selectedCity)}
            styles={{
              menu: (provided) => ({
                ...provided,
                width: 'auto',
              }),
              option: (provided) => ({
                ...provided,
                whiteSpace: 'nowrap',
              }),
            }}
          />
        </div>
        <div className="col-span-2">
          <Select
            options={countyOptions}
            placeholder={'Tüm ilçeler'}
            noOptionsMessage={() => 'Lütfen il seçiniz'}
            onChange={handleChangeCounty}
            isClearable={true}
            value={countyOptions.find(
              (option) => option.value === selectedCounty
            )}
            styles={{
              menu: (provided) => ({
                ...provided,
                width: 'auto',
              }),
              option: (provided) => ({
                ...provided,
                whiteSpace: 'nowrap',
              }),
              placeholder: (provided) => ({
                ...provided,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }),
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="btn bg-green col-span-1"
          disabled={disabled || !selectedCity ? true : false}
        >
          Ara
        </button>
      </div>
    </div>
  );
}

export default PharmacyForm;
