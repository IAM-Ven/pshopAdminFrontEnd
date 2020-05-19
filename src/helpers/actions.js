export function setCurrentPage(page, additionalProps) 
{
    this.setState( {currentPage: page} );
}

export function setCurrentRecord( record ) 
{
    this.setState( {currentRecord: record} );
}