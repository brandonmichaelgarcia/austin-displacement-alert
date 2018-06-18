# ATX-Displacement-Alert

## Summary of Solution
We are looking to create an interactive map web application, with multiple layers overlayed on the map to describe the risk of resident/tenant displacement. Because the real-time eviction filings provide only zip code level data and represent only a part of all displacements, we have sought to use multiple data sources that provide both a higher level of resolution (i.e. we want data that is localized on areas smaller than zip code level) and a more complete sketch of the factors that correlate with displacement.

## Overview of Data sources
Currently, we aim to describe the risk of displacement using the following risk factors:
1. number of recent eviction filings (zip code resolution)
2. month-over-month change in housing inventory (zipcode resolution)
3. number of tax delinquency parcels (street address resolution)
4. total price of add-on building construction permits (street address resolution)

Additionally, because the aforementioned risk factors may not always be relevant to displacement as caused by gentrification, we aim to **transform** the displacement risk factors according to a model trained to identify regions of increased vulnerability to gentrification using the following factors against the target of eviction rates from 2000-2016 (block group resolution):
1. poverty rates from 2000-2016 (block group resolution).
2. median property value from 2000-2016 (block group resolution).
3. median household income from 2000-2016 (block group resolution).
4. rent burden from 2000-2016 (block group resolution).
5. demographic changes from 2000-2016 (block group resolution).

A brief description of the data processing to model development to estimate the risk of displacement follows:
1. Displacement risk factors will be mapped to block groups
2. Displacement risk factors will be transformed (weighted or more simply filtered by a threshold value) using gentrification model to improve relevance of displacment risk factors.
3. Displacement risk factors will be scored (binary thresholds or number of deviations from average or other decided upon levels)
4. Scored risk factors will be combined into (simple) model providing discrete levels of risk.


## Detailed Description of Data sources
### Number of recent eviction filings (zip code resolution)
- This factor consists of eviction hearing records on the Travis County Court Docket.
- [x] The data source that provides up-to-date localized data has been identified.
    * This data originates from dynamically generated webpages on this website: https://odysseypa.tylerhost.net/Travis/default.aspx
    * The data can be accessed by the following navigation on the above website:
        1. Select "Court Calendar".
        2. On new page, select "Date Range", then deselect all case categories other than "Civil".
        3. Select desired date range.    
- [ ] This data is ready for incorporation into an experimental database.
- [ ] Services have been prepared to regularly update this data source into database.

### Month over month change in homes for sale (zipcode resolution)
- This factor consists of current homes on the housing market in Austin.
- [x] The data source that provides up-to-date localized data has been identified.
    * This data originates from csv files available on this website: https://www.zillow.com/research/data/
    * This data must be processed from the "InventoryMeasure_SSA_Zip_Public.csv" which provides the inventory size for for-sale homes.
- [ ] This data is ready for incorporation into an experimental database.
- [ ] Services have been prepared to regularly update this data source into database.

### Number of Tax Delinquency Parcels (street address resolution)
- This factor consists of current real property whose owner is deliquent in paying property taxes.
- [x] The data source that provides up-to-date localized data has been identified.
    * This data originates from csv files available on this website: https://tax-office.traviscountytx.gov/pages/tdc.php
    * Decriptions of this data is available on: https://tax-office.traviscountytx.gov/online-services/view-open-data
- [x] This data is ready for incorporation into an experimental database.
- [ ] Services have been prepared to regularly update this data source into database.

### Total price of add-on building construction permits (street address resolution)
- This factor consist of permits for new building construction in Austin Texas.
- [x] The data source that provides up-to-date localized data has been identified.
    * This data originates from a csv file available on this website: https://data.austintexas.gov/Building-and-Development/Issued-Construction-Permits/3syk-w9eu
- [x] This data is ready for incorporation into an experimental database.
- [ ] Services have been prepared to regularly update this data source into database.

### Eviction rates from 2000-2016 (block group resolution) AND poverty rates from 2000-2016 (block group resolution) AND median property value from 2000-2016 (block group resolution) AND median household income from 2000-2016 (block group resolution) AND rent burden from 2000-2016 (block group resolution) AND demographic shifts from 2000-2016 (block group resolution).
- The above factors consist of historical data for Travis County from 2000 to 2016 on: rates of actual eviction in each block group, rates of poverty in each block group, median property values of real property in each block group, percentage of residents in block group that are renters, and the size of population within a block group. 
- [x] The data source that provides up-to-date localized data has been identified.
    * This data originates from a csv file available on this website: https://eviction-lab-data-downloads.s3.amazonaws.com/TX/block-groups.csv
    * The relevant block groups can be restricted to those in Travis County.
- [x] This data is ready for incorporation into an experimental database.
- [ ] Services have been prepared to regularly update this data source into database.
