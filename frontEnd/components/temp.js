

/**
 * This example is nested accordion
 */

_renderContent = section => {
    return (
      <View style={styles.content}>
         <Accordion
        sections={SUBPARENT_SECTIONS}
        activeSections={this.state.activeSections}
        renderSectionTitle={this._renderSectionTitle}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
      </View>
    );
    
    };
    
    

    export default class SectionAccordionParticipants extends Component {

        _renderHeader(item, expanded) {
          return (
            <View style={{
              flexDirection: "row",
              padding: 10,
              justifyContent: "space-between",
              alignItems: "center" ,
              backgroundColor: "#A9DAD6" }}>
            <Text style={{ fontWeight: "600" }}>
                {" "}{item.participant}
              </Text>
              {expanded
                ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
                : <Icon style={{ fontSize: 18 }} name="add-circle" />}
            </View>
          );
        }
        _renderContent(item) {
          return (
            <Text
              style={{
                backgroundColor: "#e3f1f1",
                padding: 10,
                fontStyle: "italic",
              }}
            >
              {item.contact}
            </Text>
          );
        }
        render() {
          createReadableArray();
          return (
            <Container>
              <Content padder style={{ backgroundColor: "white" }}>
                
                <Accordion
                  dataArray={participantsReadableArray[0].participants}
                  animation={true}
                  expanded={true}
                  renderHeader={this._renderHeader}
                  renderContent={this._renderContent}
                />
                
              </Content>
            </Container>
          );
        }
      }