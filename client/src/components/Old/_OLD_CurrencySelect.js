import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        // marginTop: theme.spacing(2),
    },
}));

export default function CurrencySelect() {
    const classes = useStyles();
    const [currency, setCurrency] = React.useState('');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
        // <div>
        //     <FormControl className={classes.formControl}>
        //         <InputLabel id="demo-simple-select-label">Age</InputLabel>
        //         <Select
        //             labelId="demo-simple-select-label"
        //             id="demo-simple-select"
        //             value={age}
        //             onChange={handleChange}
        //         >
        //             <MenuItem value={10}>Ten</MenuItem>
        //             <MenuItem value={20}>Twenty</MenuItem>
        //             <MenuItem value={30}>Thirty</MenuItem>
        //         </Select>
        //     </FormControl>
        //     <FormControl className={classes.formControl}>
        //         <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
        //         <Select
        //             labelId="demo-simple-select-helper-label"
        //             id="demo-simple-select-helper"
        //             value={age}
        //             onChange={handleChange}
        //         >
        //             <MenuItem value="">
        //                 <em>None</em>
        //             </MenuItem>
        //             <MenuItem value={10}>Ten</MenuItem>
        //             <MenuItem value={20}>Twenty</MenuItem>
        //             <MenuItem value={30}>Thirty</MenuItem>
        //         </Select>
        //         <FormHelperText>Some important helper text</FormHelperText>
        //     </FormControl>
        //     <FormControl className={classes.formControl}>
        //         <Select
        //             value={age}
        //             onChange={handleChange}
        //             displayEmpty
        //             className={classes.selectEmpty}
        //             inputProps={{ 'aria-label': 'Without label' }}
        //         >
        //             <MenuItem value="">
        //                 <em>None</em>
        //             </MenuItem>
        //             <MenuItem value={10}>Ten</MenuItem>
        //             <MenuItem value={20}>Twenty</MenuItem>
        //             <MenuItem value={30}>Thirty</MenuItem>
        //         </Select>
        //         <FormHelperText>Without label</FormHelperText>
        //     </FormControl>
        //     <FormControl className={classes.formControl}>
        //         <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        //             Age
        // </InputLabel>
        //         <Select
        //             labelId="demo-simple-select-placeholder-label-label"
        //             id="demo-simple-select-placeholder-label"
        //             value={age}
        //             onChange={handleChange}
        //             displayEmpty
        //             className={classes.selectEmpty}
        //         >
        //             <MenuItem value="">
        //                 <em>None</em>
        //             </MenuItem>
        //             <MenuItem value={10}>Ten</MenuItem>
        //             <MenuItem value={20}>Twenty</MenuItem>
        //             <MenuItem value={30}>Thirty</MenuItem>
        //         </Select>
        //         <FormHelperText>Label + placeholder</FormHelperText>
        //     </FormControl>
        //     <FormControl className={classes.formControl} disabled>
        //         <InputLabel id="demo-simple-select-disabled-label">Name</InputLabel>
        //         <Select
        //             labelId="demo-simple-select-disabled-label"
        //             id="demo-simple-select-disabled"
        //             value={age}
        //             onChange={handleChange}
        //         >
        //             <MenuItem value="">
        //                 <em>None</em>
        //             </MenuItem>
        //             <MenuItem value={10}>Ten</MenuItem>
        //             <MenuItem value={20}>Twenty</MenuItem>
        //             <MenuItem value={30}>Thirty</MenuItem>
        //         </Select>
        //         <FormHelperText>Disabled</FormHelperText>
        //     </FormControl>
        //     <FormControl className={classes.formControl} error>
        //         <InputLabel id="demo-simple-select-error-label">Name</InputLabel>
        //         <Select
        //             labelId="demo-simple-select-error-label"
        //             id="demo-simple-select-error"
        //             value={age}
        //             onChange={handleChange}
        //             renderValue={(value) => `⚠️  - ${value}`}
        //         >
        //             <MenuItem value="">
        //                 <em>None</em>
        //             </MenuItem>
        //             <MenuItem value={10}>Ten</MenuItem>
        //             <MenuItem value={20}>Twenty</MenuItem>
        //             <MenuItem value={30}>Thirty</MenuItem>
        //         </Select>
        //         <FormHelperText>Error</FormHelperText>
        //     </FormControl>
        //     <FormControl className={classes.formControl}>
        //         <InputLabel id="demo-simple-select-readonly-label">Name</InputLabel>
        //         <Select
        //             labelId="demo-simple-select-readonly-label"
        //             id="demo-simple-select-readonly"
        //             value={age}
        //             onChange={handleChange}
        //             inputProps={{ readOnly: true }}
        //         >
        //             <MenuItem value="">
        //                 <em>None</em>
        //             </MenuItem>
        //             <MenuItem value={10}>Ten</MenuItem>
        //             <MenuItem value={20}>Twenty</MenuItem>
        //             <MenuItem value={30}>Thirty</MenuItem>
        //         </Select>
        //         <FormHelperText>Read only</FormHelperText>
        //     </FormControl>
        //     <FormControl className={classes.formControl}>
        //         <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
        //         <Select
        //             labelId="demo-simple-select-autowidth-label"
        //             id="demo-simple-select-autowidth"
        //             value={age}
        //             onChange={handleChange}
        //             autoWidth
        //         >
        //             <MenuItem value="">
        //                 <em>None</em>
        //             </MenuItem>
        //             <MenuItem value={10}>Ten</MenuItem>
        //             <MenuItem value={20}>Twenty</MenuItem>
        //             <MenuItem value={30}>Thirty</MenuItem>
        //         </Select>
        //         <FormHelperText>Auto width</FormHelperText>
        //     </FormControl>
        //     <FormControl className={classes.formControl}>
        //         <Select
        //             value={age}
        //             onChange={handleChange}
        //             displayEmpty
        //             className={classes.selectEmpty}
        //             inputProps={{ 'aria-label': 'Without label' }}
        //         >
        //             <MenuItem value="" disabled>
        //                 Placeholder
        //   </MenuItem>
        //             <MenuItem value={10}>Ten</MenuItem>
        //             <MenuItem value={20}>Twenty</MenuItem>
        //             <MenuItem value={30}>Thirty</MenuItem>
        //         </Select>
        //         <FormHelperText>Placeholder</FormHelperText>
        //     </FormControl>
        //     <FormControl required className={classes.formControl}>
        //         <InputLabel id="demo-simple-select-required-label">Age</InputLabel>
        //         <Select
        //             labelId="demo-simple-select-required-label"
        //             id="demo-simple-select-required"
        //             value={age}
        //             onChange={handleChange}
        //             className={classes.selectEmpty}
        //         >
        //             <MenuItem value="">
        //                 <em>None</em>
        //             </MenuItem>
        //             <MenuItem value={10}>Ten</MenuItem>
        //             <MenuItem value={20}>Twenty</MenuItem>
        //             <MenuItem value={30}>Thirty</MenuItem>
        //         </Select>
        //         <FormHelperText>Required</FormHelperText>
        //     </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Currency</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={currency}
                onChange={handleChange}
                label="Currency"
            >
                {/* <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
                <MenuItem value="USD" selected="selected" label="US dollar">USD</MenuItem>
                <MenuItem value="SGD" label="Singapore dollar">SGD</MenuItem>
                <MenuItem value="AUD" label="Australian dollar">AUD</MenuItem>
                <MenuItem value="EUR" label="Euro">EUR</MenuItem>
                <MenuItem value="GBP" label="Pound sterling">GBP</MenuItem>
                <MenuItem disabled>──────────</MenuItem>
                <MenuItem value="AED" label="United Arab Emirates dirham">AED</MenuItem>
                <MenuItem value="AFN" label="Afghan afghani">AFN</MenuItem>
                <MenuItem value="ALL" label="Albanian lek">ALL</MenuItem>
                <MenuItem value="AMD" label="Armenian dram">AMD</MenuItem>
                <MenuItem value="ANG" label="Netherlands Antillean guilder">ANG</MenuItem>
                <MenuItem value="AOA" label="Angolan kwanza">AOA</MenuItem>
                <MenuItem value="ARS" label="Argentine peso">ARS</MenuItem>
                <MenuItem value="AUD" label="Australian dollar">AUD</MenuItem>
                <MenuItem value="AWG" label="Aruban florin">AWG</MenuItem>
                <MenuItem value="AZN" label="Azerbaijani manat">AZN</MenuItem>
                <MenuItem value="BAM" label="Bosnia and Herzegovina convertible mark">BAM</MenuItem>
                <MenuItem value="BBD" label="Barbadian dollar">BBD</MenuItem>
                <MenuItem value="BDT" label="Bangladeshi taka">BDT</MenuItem>
                <MenuItem value="BGN" label="Bulgarian lev">BGN</MenuItem>
                <MenuItem value="BHD" label="Bahraini dinar">BHD</MenuItem>
                <MenuItem value="BIF" label="Burundian franc">BIF</MenuItem>
                <MenuItem value="BMD" label="Bermudian dollar">BMD</MenuItem>
                <MenuItem value="BND" label="Brunei dollar">BND</MenuItem>
                <MenuItem value="BOB" label="Bolivian boliviano">BOB</MenuItem>
                <MenuItem value="BRL" label="Brazilian real">BRL</MenuItem>
                <MenuItem value="BSD" label="Bahamian dollar">BSD</MenuItem>
                <MenuItem value="BTN" label="Bhutanese ngultrum">BTN</MenuItem>
                <MenuItem value="BWP" label="Botswana pula">BWP</MenuItem>
                <MenuItem value="BYN" label="Belarusian ruble">BYN</MenuItem>
                <MenuItem value="BZD" label="Belize dollar">BZD</MenuItem>
                <MenuItem value="CAD" label="Canadian dollar">CAD</MenuItem>
                <MenuItem value="CDF" label="Congolese franc">CDF</MenuItem>
                <MenuItem value="CHF" label="Swiss franc">CHF</MenuItem>
                <MenuItem value="CLP" label="Chilean peso">CLP</MenuItem>
                <MenuItem value="CNY" label="Chinese yuan">CNY</MenuItem>
                <MenuItem value="COP" label="Colombian peso">COP</MenuItem>
                <MenuItem value="CRC" label="Costa Rican colón">CRC</MenuItem>
                <MenuItem value="CUC" label="Cuban convertible peso">CUC</MenuItem>
                <MenuItem value="CUP" label="Cuban peso">CUP</MenuItem>
                <MenuItem value="CVE" label="Cape Verdean escudo">CVE</MenuItem>
                <MenuItem value="CZK" label="Czech koruna">CZK</MenuItem>
                <MenuItem value="DJF" label="Djiboutian franc">DJF</MenuItem>
                <MenuItem value="DKK" label="Danish krone">DKK</MenuItem>
                <MenuItem value="DOP" label="Dominican peso">DOP</MenuItem>
                <MenuItem value="DZD" label="Algerian dinar">DZD</MenuItem>
                <MenuItem value="EGP" label="Egyptian pound">EGP</MenuItem>
                <MenuItem value="ERN" label="Eritrean nakfa">ERN</MenuItem>
                <MenuItem value="ETB" label="Ethiopian birr">ETB</MenuItem>
                <MenuItem value="EUR" label="EURO">EUR</MenuItem>
                <MenuItem value="FJD" label="Fijian dollar">FJD</MenuItem>
                <MenuItem value="FKP" label="Falkland Islands pound">FKP</MenuItem>
                <MenuItem value="GBP" label="British pound">GBP</MenuItem>
                <MenuItem value="GEL" label="Georgian lari">GEL</MenuItem>
                <MenuItem value="GGP" label="Guernsey pound">GGP</MenuItem>
                <MenuItem value="GHS" label="Ghanaian cedi">GHS</MenuItem>
                <MenuItem value="GIP" label="Gibraltar pound">GIP</MenuItem>
                <MenuItem value="GMD" label="Gambian dalasi">GMD</MenuItem>
                <MenuItem value="GNF" label="Guinean franc">GNF</MenuItem>
                <MenuItem value="GTQ" label="Guatemalan quetzal">GTQ</MenuItem>
                <MenuItem value="GYD" label="Guyanese dollar">GYD</MenuItem>
                <MenuItem value="HKD" label="Hong Kong dollar">HKD</MenuItem>
                <MenuItem value="HNL" label="Honduran lempira">HNL</MenuItem>
                <MenuItem value="HKD" label="Hong Kong dollar">HKD</MenuItem>
                <MenuItem value="HRK" label="Croatian kuna">HRK</MenuItem>
                <MenuItem value="HTG" label="Haitian gourde">HTG</MenuItem>
                <MenuItem value="HUF" label="Hungarian forint">HUF</MenuItem>
                <MenuItem value="IDR" label="Indonesian rupiah">IDR</MenuItem>
                <MenuItem value="ILS" label="Israeli new shekel">ILS</MenuItem>
                <MenuItem value="IMP" label="Manx pound">IMP</MenuItem>
                <MenuItem value="INR" label="Indian rupee">INR</MenuItem>
                <MenuItem value="IQD" label="Iraqi dinar">IQD</MenuItem>
                <MenuItem value="IRR" label="Iranian rial">IRR</MenuItem>
                <MenuItem value="ISK" label="Icelandic króna">ISK</MenuItem>
                <MenuItem value="JEP" label="Jersey pound">JEP</MenuItem>
                <MenuItem value="JMD" label="Jamaican dollar">JMD</MenuItem>
                <MenuItem value="JOD" label="Jordanian dinar">JOD</MenuItem>
                <MenuItem value="JPY" label="Japanese yen">JPY</MenuItem>
                <MenuItem value="KES" label="Kenyan shilling">KES</MenuItem>
                <MenuItem value="KGS" label="Kyrgyzstani som">KGS</MenuItem>
                <MenuItem value="KHR" label="Cambodian riel">KHR</MenuItem>
                <MenuItem value="KID" label="Kiribati dollar">KID</MenuItem>
                <MenuItem value="KMF" label="Comorian franc">KMF</MenuItem>
                <MenuItem value="KPW" label="North Korean won">KPW</MenuItem>
                <MenuItem value="KRW" label="South Korean won">KRW</MenuItem>
                <MenuItem value="KWD" label="Kuwaiti dinar">KWD</MenuItem>
                <MenuItem value="KYD" label="Cayman Islands dollar">KYD</MenuItem>
                <MenuItem value="KZT" label="Kazakhstani tenge">KZT</MenuItem>
                <MenuItem value="LAK" label="Lao kip">LAK</MenuItem>
                <MenuItem value="LBP" label="Lebanese pound">LBP</MenuItem>
                <MenuItem value="LKR" label="Sri Lankan rupee">LKR</MenuItem>
                <MenuItem value="LRD" label="Liberian dollar">LRD</MenuItem>
                <MenuItem value="LSL" label="Lesotho loti">LSL</MenuItem>
                <MenuItem value="LYD" label="Libyan dinar">LYD</MenuItem>
                <MenuItem value="MAD" label="Moroccan dirham">MAD</MenuItem>
                <MenuItem value="MDL" label="Moldovan leu">MDL</MenuItem>
                <MenuItem value="MGA" label="Malagasy ariary">MGA</MenuItem>
                <MenuItem value="MKD" label="Macedonian denar">MKD</MenuItem>
                <MenuItem value="MMK" label="Burmese kyat">MMK</MenuItem>
                <MenuItem value="MNT" label="Mongolian tögrög">MNT</MenuItem>
                <MenuItem value="MOP" label="Macanese pataca">MOP</MenuItem>
                <MenuItem value="MRU" label="Mauritanian ouguiya">MRU</MenuItem>
                <MenuItem value="MUR" label="Mauritian rupee">MUR</MenuItem>
                <MenuItem value="MVR" label="Maldivian rufiyaa">MVR</MenuItem>
                <MenuItem value="MWK" label="Malawian kwacha">MWK</MenuItem>
                <MenuItem value="MXN" label="Mexican peso">MXN</MenuItem>
                <MenuItem value="MYR" label="Malaysian ringgit">MYR</MenuItem>
                <MenuItem value="MZN" label="Mozambican metical">MZN</MenuItem>
                <MenuItem value="NAD" label="Namibian dollar">NAD</MenuItem>
                <MenuItem value="NGN" label="Nigerian naira">NGN</MenuItem>
                <MenuItem value="NIO" label="Nicaraguan córdoba">NIO</MenuItem>
                <MenuItem value="NOK" label="Norwegian krone">NOK</MenuItem>
                <MenuItem value="NPR" label="Nepalese rupee">NPR</MenuItem>
                <MenuItem value="NZD" label="New Zealand dollar">NZD</MenuItem>
                <MenuItem value="OMR" label="Omani rial">OMR</MenuItem>
                <MenuItem value="PAB" label="Panamanian balboa">PAB</MenuItem>
                <MenuItem value="PEN" label="Peruvian sol">PEN</MenuItem>
                <MenuItem value="PGK" label="Papua New Guinean kina">PGK</MenuItem>
                <MenuItem value="PHP" label="Philippine peso">PHP</MenuItem>
                <MenuItem value="PKR" label="Pakistani rupee">PKR</MenuItem>
                <MenuItem value="PLN" label="Polish złoty">PLN</MenuItem>
                <MenuItem value="PRB" label="Transnistrian ruble">PRB</MenuItem>
                <MenuItem value="PYG" label="Paraguayan guaraní">PYG</MenuItem>
                <MenuItem value="QAR" label="Qatari riyal">QAR</MenuItem>
                <MenuItem value="RON" label="Romanian leu">RON</MenuItem>
                <MenuItem value="RON" label="Romanian leu">RON</MenuItem>
                <MenuItem value="RSD" label="Serbian dinar">RSD</MenuItem>
                <MenuItem value="RUB" label="Russian ruble">RUB</MenuItem>
                <MenuItem value="RWF" label="Rwandan franc">RWF</MenuItem>
                <MenuItem value="SAR" label="Saudi riyal">SAR</MenuItem>
                <MenuItem value="SEK" label="Swedish krona">SEK</MenuItem>
                <MenuItem value="SGD" label="Singapore dollar">SGD</MenuItem>
                <MenuItem value="SHP" label="Saint Helena pound">SHP</MenuItem>
                <MenuItem value="SLL" label="Sierra Leonean leone">SLL</MenuItem>
                <MenuItem value="SLS" label="Somaliland shilling">SLS</MenuItem>
                <MenuItem value="SOS" label="Somali shilling">SOS</MenuItem>
                <MenuItem value="SRD" label="Surinamese dollar">SRD</MenuItem>
                <MenuItem value="SSP" label="South Sudanese pound">SSP</MenuItem>
                <MenuItem value="STN" label="São Tomé and Príncipe dobra">STN</MenuItem>
                <MenuItem value="SYP" label="Syrian pound">SYP</MenuItem>
                <MenuItem value="SZL" label="Swazi lilangeni">SZL</MenuItem>
                <MenuItem value="THB" label="Thai baht">THB</MenuItem>
                <MenuItem value="TJS" label="Tajikistani somoni">TJS</MenuItem>
                <MenuItem value="TMT" label="Turkmenistan manat">TMT</MenuItem>
                <MenuItem value="TND" label="Tunisian dinar">TND</MenuItem>
                <MenuItem value="TOP" label="Tongan paʻanga">TOP</MenuItem>
                <MenuItem value="TRY" label="Turkish lira">TRY</MenuItem>
                <MenuItem value="TTD" label="Trinidad and Tobago dollar">TTD</MenuItem>
                <MenuItem value="TVD" label="Tuvaluan dollar">TVD</MenuItem>
                <MenuItem value="TWD" label="New Taiwan dollar">TWD</MenuItem>
                <MenuItem value="TZS" label="Tanzanian shilling">TZS</MenuItem>
                <MenuItem value="UAH" label="Ukrainian hryvnia">UAH</MenuItem>
                <MenuItem value="UGX" label="Ugandan shilling">UGX</MenuItem>
                <MenuItem value="USD" label="United States dollar">USD</MenuItem>
                <MenuItem value="UYU" label="Uruguayan peso">UYU</MenuItem>
                <MenuItem value="UZS" label="Uzbekistani soʻm">UZS</MenuItem>
                <MenuItem value="VES" label="Venezuelan bolívar soberano">VES</MenuItem>
                <MenuItem value="VND" label="Vietnamese đồng">VND</MenuItem>
                <MenuItem value="VUV" label="Vanuatu vatu">VUV</MenuItem>
                <MenuItem value="WST" label="Samoan tālā">WST</MenuItem>
                <MenuItem value="XAF" label="Central African CFA franc">XAF</MenuItem>
                <MenuItem value="XCD" label="Eastern Caribbean dollar">XCD</MenuItem>
                <MenuItem value="XOF" label="West African CFA franc">XOF</MenuItem>
                <MenuItem value="XPF" label="CFP franc">XPF</MenuItem>
                <MenuItem value="ZAR" label="South African rand">ZAR</MenuItem>
                <MenuItem value="ZMW" label="Zambian kwacha">ZMW</MenuItem>
                <MenuItem value="ZWB" label="Zimbabwean bonds">ZWB</MenuItem>
            </Select>
        </FormControl>
        /* <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={age}
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
    </div> */

    );
}